import axios from 'axios';

const SpawnSizes = [50274091, 25830791];

export { SpawnSizes };

export default async function load_spawn(api, fs) {
  let file = fs.files.get('spawn.mpq');
  if (file && !SpawnSizes.includes(file.byteLength)) {
    fs.files.delete('spawn.mpq');
    await fs.delete('spawn.mpq');
    file = null;
  }
  if (!file) {
    // First, get metadata
    const metadataResponse = await axios.request({
      url: '/chunks/spawn.mpq.meta',
      responseType: 'json',
      headers: {
        'Cache-Control': 'max-age=31536000'
      }
    });
    
    const { totalSize, numChunks } = metadataResponse.data;
    
    if (!SpawnSizes.includes(totalSize)) {
      throw Error("Invalid spawn.mpq size. Try clearing cache and refreshing the page.");
    }
    
    // Download all chunks
    const chunks = [];
    let loadedBytes = 0;
    
    const createProgressHandler = (chunkIndex, currentLoadedBytes) => (e) => {
      if (api.onProgress) {
        api.onProgress({
          text: `Downloading chunk ${chunkIndex + 1}/${numChunks}...`,
          loaded: currentLoadedBytes + e.loaded,
          total: totalSize
        });
      }
    };
    
    for (let i = 0; i < numChunks; i++) {
      const chunkResponse = await axios.request({
        url: `/chunks/spawn.mpq.chunk${i.toString().padStart(3, '0')}`,
        responseType: 'arraybuffer',
        onDownloadProgress: createProgressHandler(i, loadedBytes),
        headers: {
          'Cache-Control': 'max-age=31536000'
        }
      });
      
      chunks.push(new Uint8Array(chunkResponse.data));
      loadedBytes += chunkResponse.data.byteLength;
    }
    
    // Reassemble chunks
    const data = new Uint8Array(totalSize);
    let offset = 0;
    
    for (const chunk of chunks) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    
    fs.files.set('spawn.mpq', data);
    fs.update('spawn.mpq', data.slice());
  }
  return fs;
}

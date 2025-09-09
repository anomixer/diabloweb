const fs = require('fs');
const path = require('path');

const inputFile = 'build/spawn.mpq';
const outputDir = 'public/chunks';
const chunkSize = 20 * 1024 * 1024; // 20MB chunks

if (!fs.existsSync(inputFile)) {
  console.error('spawn.mpq not found in build directory');
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const buffer = fs.readFileSync(inputFile);
const totalSize = buffer.length;
const numChunks = Math.ceil(totalSize / chunkSize);

console.log(`Splitting ${inputFile} (${totalSize} bytes) into ${numChunks} chunks`);

for (let i = 0; i < numChunks; i++) {
  const start = i * chunkSize;
  const end = Math.min(start + chunkSize, totalSize);
  const chunk = buffer.slice(start, end);
  
  const chunkFile = path.join(outputDir, `spawn.mpq.chunk${i.toString().padStart(3, '0')}`);
  fs.writeFileSync(chunkFile, chunk);
  
  console.log(`Created ${chunkFile} (${chunk.length} bytes)`);
}

// Create metadata file
const metadata = {
  totalSize,
  numChunks,
  chunkSize
};

fs.writeFileSync(path.join(outputDir, 'spawn.mpq.meta'), JSON.stringify(metadata, null, 2));
console.log(`Created metadata file with ${JSON.stringify(metadata)}`);

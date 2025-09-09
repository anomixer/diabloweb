# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DiabloWeb is a web port of the original Diablo game, running entirely in browsers using WebAssembly. The project is based on the devilution source code reconstruction and uses a sophisticated architecture combining React, WebAssembly, Web Workers, and custom build tooling.

## Essential Commands

### Development
```bash
npm start          # Start development server with hot reload
npm run build      # Create production build in 'build/' directory  
npm test           # Run Jest tests in watch mode
npm run deploy     # Build and deploy to GitHub Pages
```

### Testing
```bash
npm test           # Interactive test runner with watch mode
npm test -- --watchAll  # Run all tests and watch for changes
npm test -- --coverage  # Run tests with coverage report
```

## Architecture Overview

### Core Components

**Main Application (`src/App.js`)**
- Single React component managing game state, UI, and file handling
- Handles drag-and-drop MPQ files, save file management, touch controls
- Interfaces with WebAssembly game engine via Web Worker

**WebAssembly Game Engine (`src/api/game.worker.js`)**
- Runs game logic in separate worker thread for performance
- Loads Diablo.wasm (retail) or DiabloSpawn.wasm (shareware) modules
- Handles rendering, audio, input processing, and game state

**Game Loader (`src/api/loader.js`)**
- Orchestrates worker initialization and communication
- Manages canvas rendering (legacy batch mode or offscreen bitmap)
- Bridges audio system and file system operations

**Virtual File System (`src/fs.js`)**
- IndexedDB-based persistent storage for game files and saves  
- Handles MPQ game data files and save file (.sv) management
- Provides file upload/download functionality

### Key Architecture Patterns

**Worker-Based Execution**: Game runs in Web Worker to avoid blocking main UI thread. Communication via message passing with transferable objects for performance.

**Modular WebAssembly**: Separate WASM modules for retail vs shareware versions, loaded dynamically based on game type.

**Canvas Rendering Pipeline**: Supports both legacy batch rendering (transferring image data arrays) and modern OffscreenCanvas with ImageBitmap transfers.

**Persistent Game State**: Uses IndexedDB for save games, settings, and cached game assets with fallback for unsupported browsers.

## File Structure

```
src/
├── App.js              # Main React application component  
├── index.js            # Application entry point
├── fs.js               # Virtual file system (IndexedDB)
├── api/
│   ├── game.worker.js  # WebAssembly game engine worker
│   ├── loader.js       # Game initialization and worker management
│   ├── load_spawn.js   # Shareware version loader
│   ├── sound.js        # Web Audio API integration
│   └── savefile.js     # Save game parsing utilities
├── App.scss            # Main stylesheet
└── reset.css           # CSS reset

config/
├── webpack.config.js   # Custom webpack configuration
├── paths.js            # Build path constants
└── env.js              # Environment variable handling

scripts/
├── build.js            # Production build script
├── start.js            # Development server script  
└── test.js             # Jest test runner configuration
```

## Deployment

### Cloudflare Pages 部署

這個項目完全兼容 Cloudflare Pages。部署步驟：

**方法 1: Git 連接部署（推薦）**
1. 將代碼推送到 GitHub/GitLab
2. 在 [Cloudflare Pages](https://pages.cloudflare.com/) 創建新項目
3. 連接 Git 倉庫
4. 設置構建配置：
   - Framework preset: `Create React App`
   - Build command: `npm run build`
   - Build output directory: `build`
   - Node.js version: `18`

**方法 2: Wrangler CLI 部署**
```bash
# 安裝 Wrangler
npm install -g @cloudflare/wrangler

# 構建項目
npm run build

# 部署
wrangler pages deploy build --project-name diabloweb
```

**重要配置文件**：
- `public/_redirects` - SPA 路由重定向
- `wrangler.toml` - Cloudflare 配置
- `package.json` - homepage 設為 `"."` 用於相對路徑

### GitHub Pages 部署

原有的 GitHub Pages 部署仍然有效：
```bash
npm run deploy  # 部署到 GitHub Pages
```

## Development Workflows

### Working with Game Logic
- Game logic runs in WebAssembly worker (`src/api/game.worker.js`)
- Modify worker for engine-level changes (input handling, rendering, audio)
- Use `DApi` object for worker-to-main thread communication
- Test changes with both retail and shareware game modes

### File System Operations  
- Virtual FS handles MPQ game data and save files via IndexedDB
- Use `create_fs()` to get file system instance
- Save games use `.sv` extension and are managed automatically
- Test with `window.DownloadSaves()` and drag-and-drop file upload

### Adding New Features
- UI changes go in `App.js` React component
- Worker communication uses message passing with typed actions
- Audio integration via Web Audio API in `src/api/sound.js` 
- Network features use WebRTC (`src/api/webrtc.js`) and WebSocket APIs

### Build Customization
- Webpack config supports custom loaders for `.worker.js`, `.wasm`, `.jscc` files
- Worker files automatically wrapped with worker-loader
- WebAssembly modules loaded as binary assets
- Production builds optimize for deployment to GitHub Pages

### Testing Strategy
- Jest configured for React/WebAssembly environment
- Test files use `.test.js` or `.spec.js` extensions
- Mock WebAssembly and worker dependencies for unit tests
- Integration testing requires browser environment for IndexedDB/Canvas APIs

## Platform Support

**Browsers**: Chrome, Firefox, Safari, Edge (requires WebAssembly + Web Workers)
**Mobile**: Touch controls implemented with gesture handling and virtual keyboard
**Deployment**: Static hosting via GitHub Pages with service worker caching

## External Dependencies

- **MPQ Files**: Requires original game data files (DIABDAT.MPQ or spawn.mpq)
- **WebAssembly Modules**: Compiled from C++ source at https://github.com/d07RiV/devilution
- **CDN Assets**: Some external dependencies loaded from CDN in production

## Development Gotchas

- WebAssembly modules must match browser compatibility (check Emscripten version)
- Worker-based architecture requires careful state synchronization 
- IndexedDB is async - always handle promises properly
- Canvas operations are expensive - batch rendering for performance
- Touch controls conflict with mouse events - test on actual mobile devices
- MPQ file format is proprietary - use existing parsers, don't implement from scratch

## Performance Considerations

- Game renders at ~20fps via worker setInterval
- Large MPQ files (>500MB) require streaming/chunked loading
- Audio samples cached in Web Audio API buffers
- Save games stored locally - no server-side persistence
- Service worker provides offline functionality in production builds

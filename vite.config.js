import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const saveHotspotsPlugin = () => ({
  name: 'save-hotspots',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/save-hotspots' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const filePath = path.resolve(__dirname, 'hotspots-calibration.json');
          fs.writeFileSync(filePath, body);
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true }));
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), saveHotspotsPlugin()],
})

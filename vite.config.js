import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoApiKey: env.VITE_APP_KAKAO_MAP_API_KEY
          }
        }
      })
    ]
  };
});

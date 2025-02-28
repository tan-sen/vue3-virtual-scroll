import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            include: ['src'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VirtualScroll',
            fileName: 'virtual-scroll',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: ['vue'], // 不打包 Vue
            output: {
                globals: {
                    vue: 'Vue', // 全局变量名映射
                },
            },
        },
    },
});
//# sourceMappingURL=vite.config.js.map
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
import PkgConfig from 'vite-plugin-package-config';
import checker from 'vite-plugin-checker';
import cesium from 'vite-plugin-cesium';

export default (env) => {
  return [
    vue({
      include: [/\.vue$/],
    }),
    vueJsx(),
    svgLoader(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      dts: './src/components.d.ts',
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['src/components/'],
      resolvers: [AntDesignVueResolver(), VueUseComponentsResolver()],
    }),
    PkgConfig(),
    env.mode === 'production'
      ? null
      : checker({
          enableBuild: false,
          typescript: false,
          vueTsc: true,
          eslint: {
            lintCommand: 'eslint "./src/**/*.{js,jsx,vue}"',
            dev: {
              logLevel: ['error'],
            },
          },
        }),
    cesium(),
  ];
};

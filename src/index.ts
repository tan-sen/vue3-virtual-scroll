import { App, Plugin } from 'vue';
import VirtualScroll from './components/VirtualScroll.vue';

const plugin: Plugin = {
  install(app: App) {
    app.component('VirtualScroll', VirtualScroll);
  },
};

export default plugin;

import router from '@/router/index';
import store from '@/store';
import App from './App.vue';

import '@/styles/index.less';

const app = createApp(App);

app.use(router).use(store);
app.mount('#app');

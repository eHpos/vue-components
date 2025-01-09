import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

let VConsole = require("vconsole");
new VConsole();

const app = createApp(App);
app.use(router);
app.mount('#app');

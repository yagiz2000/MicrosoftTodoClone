import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store";
import vClickOutside from 'v-click-outside'


const app = createApp(App).use(store);
app.use(vClickOutside)

app.mount('#app');


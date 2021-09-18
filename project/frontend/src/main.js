import { createApp } from 'vue'
import App from './App.vue'

import Icons from './assets/uikit/js/3.5.10-icons.js';
import UIkit from './assets/uikit/js/3.5.10.js';

UIkit.use (Icons);

createApp(App).mount('#app')

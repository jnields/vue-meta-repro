import Vue from 'vue';
import { ROOT_ID } from './consts';

import App from './App';

new App().$mount(`#${ROOT_ID}`);

Vue.nextTick(() => {
  console.log(
    'broken: ',
    document.querySelectorAll('link[rel="next"]').length === 2,
  );
});

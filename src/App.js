import Vue from 'vue';
import VueMeta from 'vue-meta';
import { ROOT_ID } from './consts';

Vue.use(VueMeta);

const A = {
  name: 'A',
  metaInfo() {
    return {
      title: 'hello world ',
      link: [{ rel: 'next', href: '?page=2' }],
    };
  },
  render(h) {
    return h('h1', { attrs: { id: ROOT_ID } }, 'Hello World');
  },
};

export default Vue.extend({
  name: 'Root',
  render(h) {
    return h(A);
  },
});

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  hash: true,
  routes: [
    // { exact: false, path: '*', redirect: '/login' },
    { exact: true, path: '/', component: '@/pages/Index' },
    { exact: true, path: '/login', component: '@/pages/Login' },
    { exact: true, path: '/chat', component: '@/components/Chat' },
  ],
  // fastRefresh: {},
  mfsu: {},
});

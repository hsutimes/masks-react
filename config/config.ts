import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/Index' },
    { path: '/login', component: '@/pages/Login' },
  ],
  fastRefresh: {},
  mfsu: {},
});

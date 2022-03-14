import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  history: { type: 'hash' },
  hash: true,
  routes,
  // fastRefresh: {},
  mfsu: {},
});

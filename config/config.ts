import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // history: { type: 'hash' },
  hash: true,
  antd: { mobile: false },
  routes,
  theme: {
    'primary-color': '#76c6b8',
    'border-radius-base': '4px',
  },
  // fastRefresh: {},
  mfsu: {},
});

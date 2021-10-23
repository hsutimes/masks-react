// src/app.tsx
import { useModel } from 'umi';
// 全局连接Model
window.connectModel = (key, name) => {
  return (WrappedComponent) => {
    return (props) => {
      const model = useModel(name);
      const data = { [key]: model };
      return <WrappedComponent {...props} {...data} />;
    };
  };
};

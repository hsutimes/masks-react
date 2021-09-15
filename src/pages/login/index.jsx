import { Button, List, InputItem, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';

const Page = (props) => {
  const { getFieldProps, getFieldError } = props.form;

  const onSubmit = () => {
    props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        // console.log(props.form.getFieldsValue());
        let obj = props.form.getFieldsValue();
        console.log(obj.account);
        history.push('/');
      } else {
        Toast.fail('Validation failed');
      }
    });
  };
  const validateAccount = (rule, value, callback) => {
    if (value && value.length >= 2) {
      callback();
    } else {
      callback(new Error('至少大于等于2个字符'));
    }
  };

  return (
    <>
      <form>
        <List>
          <div style={{ paddingTop: '70%', paddingLeft: 10, paddingRight: 10 }}>
            <InputItem
              {...getFieldProps('account', {
                // initialValue: 'little ant',
                rules: [
                  { required: true, message: '请输入昵称' },
                  { validator: validateAccount },
                ],
              })}
              clear
              error={!!getFieldError('account')}
              onErrorClick={() => {
                Toast.fail(getFieldError('account').join('、'));
              }}
              placeholder="输入昵称"
            >
              <div
                style={{
                  backgroundImage:
                    'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)',
                  backgroundSize: 'cover',
                  height: '22px',
                  width: '22px',
                }}
              />
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={onSubmit}>
              进入西方极乐世界
            </Button>
            <WhiteSpace />
          </div>
        </List>
      </form>
    </>
  );
};
const App = createForm()(Page);
export default App;

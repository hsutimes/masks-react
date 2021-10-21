import React from 'react';
import ReactDOM from 'react-dom';
import { TabBar, ListView } from 'antd-mobile';

import Home from '@/components/Home';
import Friends from '@/components/Friends';

import { history } from 'umi';
import Cookies from 'js-cookie';

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: true,
      user: {
        name: '',
        avatar_color: '',
      },
    };
  }

  componentDidMount() {
    let a = Cookies.get('account');
    let c = Cookies.get('avatar_color');
    if (!a || !c) {
      history.push('/login');
    } else {
      // console.log(a);
      this.setState({
        user: {
          name: a,
          avatar_color: JSON.parse(c),
        },
      });
    }
  }

  // renderContent(pageText) {
  //   return (
  //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
  //       <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <>
        <div
          style={
            this.state.fullScreen
              ? {
                  position: 'fixed',
                  height: '100%',
                  width: '100%',
                  top: 0,
                  maxWidth: 768,
                }
              : { height: 400 }
          }
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              title="Home"
              key="Home"
              // badge={2}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
              }}
              data-seed="logId1"
            >
              <Home user={this.state.user} />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              title="Friend"
              key="Friend"
              dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
              }}
            >
              <Friends />
            </TabBar.Item>
          </TabBar>
        </div>
      </>
    );
  }
}

export default TabBarExample;

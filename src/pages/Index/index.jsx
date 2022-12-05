import React from 'react';
import ReactDOM from 'react-dom';
import { TabBar, ListView } from 'antd-mobile';
import { AppstoreOutline, UserContactOutline } from 'antd-mobile-icons';

import Home from '@/components/Home';
import Friends from '@/components/Friends';

import { history } from 'umi';
import Cookies from 'js-cookie';

@window.connectModel('api', 'useWebSocketModel')
class Index extends React.Component {
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
      api: this.props.api,
    };
  }

  componentDidMount() {
    let a = Cookies.get('account');
    let c = Cookies.get('avatar_color');
    if (!a || !c) {
      history.push('/login');
    } else {
      // console.log(a);
      this.setState(
        {
          user: {
            name: a,
            avatar_color: JSON.parse(c),
          },
        },
        () => {
          const { user, api } = this.state;
          // console.log(user);
          if (!api.conn) {
            api.init(user.name);
          }
        },
      );
    }
  }

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
            tintColor="#76c6b8"
            unselectedTintColor="#949494"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              icon={<AppstoreOutline fontSize={24} />}
              selectedIcon={<AppstoreOutline fontSize={24} color="#76c6b8" />}
              title="首页"
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
              icon={<UserContactOutline fontSize={24} />}
              selectedIcon={
                <UserContactOutline fontSize={24} color="#76c6b8" />
              }
              title="好友"
              key="Friend"
              // dot
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

export default Index;

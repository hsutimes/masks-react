import React from 'react';
import { Avatar, Button } from 'antd';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      f: [
        {
          name: 'Jack',
          avatar_color: { background: 'rgb(123,176,71)' },
        },
        {
          name: 'Tom',
          avatar_color: { background: 'rgb(12,16,71)' },
        },
        {
          name: 'Alice',
          avatar_color: { background: 'rgb(23,76,1)' },
        },
      ],
      a: 1,
    };
  }

  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: 'white',
            height: '100%',
            textAlign: 'center',
          }}
        >
          {/* <div>{this.state.f[0].name}</div> */}
          {this.state.f.map((o, k) => (
            <div key={k} style={{ paddingTop: 10 }}>
              <Avatar style={o.avatar_color}>
                {o.name.charAt(0).toUpperCase()}
              </Avatar>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Friends;

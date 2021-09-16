import React from 'react';
import { Avatar, Button } from 'antd';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      f: [
        {
          name: 'Jack',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Alice',
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
              <Avatar>{o.name}</Avatar>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Friends;

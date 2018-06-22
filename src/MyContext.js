import React, { Component } from 'react';
const myContext = React.createContext();
export class Provider extends Component {
  state = {
    p_emailid: '',
    p_id: '',
    p_fullName: ''
  };

  setEmail = (email, id, fullName) => {
    this.setState({
      p_emailid: email,
      p_id: id,
      p_fullName: fullName
    });
  };
  render() {
    return (
      <myContext.Provider
        value={{
          p_emailid: this.state.p_emailid,
          setEmail: this.setEmail
        }}
      >
        {this.props.children}
      </myContext.Provider>
    );
  }
}

export const Consumer = myContext.Consumer;

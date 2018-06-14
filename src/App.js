import React, { Component } from 'react';

// import for the routing in react

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import for graphql client
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import axios from 'axios';

import UserSignUp from './components/UserSignUp/UserSignUp';
import HomeHeader from './components/HomeHeader/HomeHeader';
import HomePage from './components/HomePage/HomePage';
import UserLogin from './components/UserLogin/UserLogin';
import EmailConfirmation from './components/EmailConfirmation/EmailConfirmation';
import EmailActivationLink from './components/EmailActivationLink/EmailActivationLink';
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    isLoggedIn: true
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          Login: () => this.setState({ isLoggedIn: true }),
          Logout: () => this.setState({ isLoggedIn: false })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      emailid: null,
      fullname: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    console.log('tr', userObject);
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');
        this.setState({
          loggedIn: true,
          emailid: response.data.user.emailid,
          fullname: response.data.user.fullname
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          emailid: null,
          fullname: null
        });
      }
    });
  }

  render() {
    return (
      <MyProvider>
        <ApolloProvider client={client}>
          <Router>
            <React.Fragment>
              <HomeHeader
                updateUser={this.updateUser}
                loggedIn={this.state.loggedIn}
                fullname={this.state.fullname}
              />
              <br />
              <div className="container">
                <Route exact strict path="/" component={HomePage} />
                <Route exact strict path="/Signup" component={UserSignUp} />
                <Route
                  exact
                  strict
                  path="/Login"
                  render={() => <UserLogin updateUser={this.updateUser} />}
                />
                <Route
                  exact
                  strict
                  path="/EmailConfirmation"
                  render={() => (
                    <EmailConfirmation email={this.state.emailid} />
                  )}
                />
                <Route
                  exact
                  strict
                  path="/EmailActivation/:id"
                  render={props => <EmailActivationLink {...props} />}
                />
              </div>
            </React.Fragment>
          </Router>
        </ApolloProvider>
      </MyProvider>
    );
  }
}

export default App;

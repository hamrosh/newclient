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
import CourseContent from './components/CourseContent/CourseContent';
import { Provider, Consumer } from './MyContext';
const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      emailid: null,
      fullName: null
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
          fullName: response.data.user.fullName
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          emailid: null,
          fullName: null
        });
      }
    });
  }

  render() {
    return (
      <Provider>
        <Consumer>
          {value => {
            console.log(value);
            const { setEmail } = value;
            return (
              <ApolloProvider client={client}>
                <Router>
                  <React.Fragment>
                    <HomeHeader
                      updateUser={this.updateUser}
                      loggedIn={this.state.loggedIn}
                      fullName={this.state.fullName}
                      setEmail={setEmail}
                    />
                    <br />
                    <div className="container">
                      <Route exact strict path="/" component={HomePage} />
                      <Route
                        exact
                        strict
                        path="/Signup"
                        component={UserSignUp}
                      />
                      <Route
                        exact
                        strict
                        path="/Login"
                        render={() => (
                          <UserLogin
                            setEmail={setEmail}
                            updateUser={this.updateUser}
                          />
                        )}
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
                      <Route
                        exact
                        strict
                        path="/Courses/:routeURL"
                        render={props => <CourseContent {...props} />}
                      />
                    </div>
                  </React.Fragment>
                </Router>
              </ApolloProvider>
            );
          }}
        </Consumer>;
      </Provider>
    );
  }
}

export default App;

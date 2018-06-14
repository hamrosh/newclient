import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ACTIVATE_USER } from './gql/mutations';

class YourComponent extends Component {
  componentDidMount() {
    console.log(this.props.userid);
    this.props.someFunction({ variables: { id: this.props.userid } });
  }
  render() {
    return <div />;
  }
}

class EmailActivationLink extends Component {
  render() {
    return (
      <div>
        <Mutation
          mutation={ACTIVATE_USER}
          errorPolicy="all"
          onError={e => {
            console.log(e.message);
          }}
          onCompleted={data => {
            console.log(data);
          }}
        >
          {(activateUser, { data, loading, error }) => {
            return (
              <div>
                <YourComponent
                  userid={this.props.match.params.id}
                  someFunction={activateUser}
                />

                {loading && (
                  <div class="alert alert-warning" role="alert">
                    <p>Saving Category</p>
                  </div>
                )}

                {error && (
                  <div class="alert alert-warning" role="alert">
                    <p>Erroe Category {error.message}</p>
                  </div>
                )}
                {data && (
                  <div class="alert alert-warning" role="alert">
                    <p>Your Account has been activated</p>
                  </div>
                )}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}
export default EmailActivationLink;

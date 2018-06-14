import React, { Component } from 'react';

class EmailConfirmation extends Component {
  render() {
    return (
      <div>
        <h3>
          A confirmation email has been sent to {this.props.email},Please click
          on the activation link in the email to activate your account.
        </h3>
      </div>
    );
  }
}
export default EmailConfirmation;

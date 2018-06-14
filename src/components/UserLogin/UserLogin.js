import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { USER_EXISTS } from './gql';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import for showing toast message

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Yup = require('yup');

// Validation Schema

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required!'),
  emailid: Yup.string()
    .email('Please Enter a Valid Email Address')
    .required('Required!')
});

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      redirectTo: null
    };
  }
  error = msg => toast.error('' + msg);

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div class="row">
          <div class="col-md-3">
            <h1>User Login</h1>
          </div>
          <div class="col-md-9">
            <Formik
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                axios
                  .post('/user/login', {
                    emailid: values.emailid,
                    password: values.password
                  })
                  .then(response => {
                    console.log(response.status);
                    console.log(response);
                    actions.setSubmitting(false);
                    if (response.status === 200) {
                      // update App.js state

                      console.log('login response: ', response.data);

                      if (response.data.message) {
                        this.error(response.data.message);
                        actions.setSubmitting(false);
                        return;
                      }
                      this.props.updateUser({
                        loggedIn: true,
                        emailid: response.data.emailid,
                        fullname: response.data.fullname
                      });

                      this.setState({
                        redirectTo: '/'
                      });
                    }
                  })
                  .catch(error => {
                    console.log('login error: ');
                    console.log(error);
                    actions.setSubmitting(false);
                  });
              }}
              initialValues={{
                emailid: '',
                password: ''
              }}
              render={({ errors, touched, isSubmitting, dirty, values }) => {
                return (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="emailid">Email Address</label>
                      <Field
                        type="text"
                        name="emailid"
                        placeholder="Email Address"
                        className={
                          errors.emailid && touched.emailid
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {touched.emailid &&
                        errors.emailid && <div>{errors.emailid}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={
                          errors.password && touched.password
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {touched.password &&
                        errors.password && <div>{errors.password}</div>}
                    </div>

                    <button
                      type="submit"
                      disabled={!dirty || isSubmitting}
                      className="btn btn-primary"
                    >
                      Login
                    </button>
                  </Form>
                );
              }}
            />
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </div>
      );
    }
  }
}
export default UserLogin;

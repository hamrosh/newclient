import React, { Component } from 'react';
import { ADD_APP_USER } from './gql';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
// import for showing toast message
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Yup = require('yup');

// Validation Schema

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Required!'),
  password: Yup.string().required('Required!'),
  mobilenumber: Yup.string().required('Required!'),
  emailid: Yup.string()
    .email('Please Enter a Valid Email Address')
    .required('Required!')
});
// main Component

class UserSignUp extends Component {
  error = msg => toast.error('Some Error Occured while Saving' + msg);
  constructor() {
    super();
    this.state = {
      redirectTo: null
    };
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <React.Fragment>
          <Mutation
            mutation={ADD_APP_USER}
            errorPolicy="all"
            onError={e => {
              console.log(e.message);
              this.error(e.message);
            }}
            onCompleted={data => {
              console.log(data);

              this.setState({
                redirectTo: '/EmailConfirmation'
              });
            }}
          >
            {(addAppUser, { loading, error, data }) => {
              return (
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{}}
                  onSubmit={(values, actions) => {
                    console.log(values);

                    actions.setSubmitting(true);
                    addAppUser({
                      variables: {
                        input: {
                          fullname: values.fullname,
                          emailid: values.emailid,
                          password: values.password,
                          mobilenumber: values.mobilenumber
                        }
                      }
                    });

                    actions.setSubmitting(false);
                  }}
                  render={({
                    errors,
                    touched,
                    isSubmitting,
                    dirty,
                    values
                  }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="category">Full Name</label>
                        <Field
                          type="text"
                          name="fullname"
                          placeholder="Full Name"
                          value={values.fullname || ''}
                          className={
                            errors.fullname && touched.fullname
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {touched.fullname &&
                          errors.fullname && <div>{errors.fullname}</div>}
                      </div>
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
                      <div className="form-group">
                        <label htmlFor="mobileno">Mobile Number</label>
                        <Field
                          type="mobilenumber"
                          name="mobilenumber"
                          placeholder="Mobile Number"
                          className={
                            errors.mobilenumber && touched.mobilenumber
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {touched.mobilenumber &&
                          errors.mobilenumber && (
                            <div>{errors.mobilenumber}</div>
                          )}
                      </div>
                      <button
                        type="submit"
                        disabled={!dirty || isSubmitting}
                        className="btn btn-primary"
                      >
                        Sign Up
                      </button>
                    </Form>
                  )}
                />
              );
            }}
          </Mutation>

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
        </React.Fragment>
      );
    }
  }
}

export default UserSignUp;

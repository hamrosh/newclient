import React, { Component } from 'react';

import CoursesList from '../CoursesList/CoursesList';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <h5>Recently Added Courses</h5>
        <CoursesList />
      </React.Fragment>
    );
  }
}
export default HomePage;

import React, { Component } from 'react';
import Slider from 'react-slick';
import CoursesItem from '../CoursesItem/CoursesItem';
import { Query } from 'react-apollo';

import { LATEST_COURSES } from './gql';
class PracticeSetList extends Component {
  render() {
    var settings = {
      speed: 500,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4
    };

    return (
      <React.Fragment>
        <Query query={LATEST_COURSES} variables={{}}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <Slider {...settings}>
                {data.getPracticeSets.map(
                  ({ id, description, authorName, isFree, rate, routeURL }) => (
                    <div className="pluslink">
                      <CoursesItem
                        title={description}
                        isFree={isFree}
                        rate={rate}
                        author={authorName}
                        routeURL={routeURL}
                      />
                    </div>
                  )
                )}
              </Slider>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
export default PracticeSetList;

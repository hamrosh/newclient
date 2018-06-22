import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Consumer } from '../../MyContext';

class CourseContent extends Component {
  render() {
    return (
      <div>
        <div>
          <Query
            query={gql`
              query practiceSetInfo($routeURL: String) {
                practiceSetInfo(routeURL: $routeURL) {
                  id
                  description
                }
              }
            `}
            variables={{ routeURL: this.props.match.params.routeURL }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              let x = data.practiceSetInfo;
              console.log(this.props.match.params.routeURL);
              return (
                <React.Fragment>
                  <div key={x.id} class="row">
                    <div class="col-8">
                      <h4>{x.description}</h4>
                      <p>{`${x.id}: $`}</p>
                    </div>
                    <div class="col-4">
                      <img
                        className="card-img-top"
                        src="/images/gk_img.jpg"
                        alt="Card image cap"
                      />
                    </div>
                  </div>
                  {/* <Consumer>
                    {value => {
                      console.log(value);
                      const { p_emailid, p_fullName, p_id } = value;
                      return (
                        <h3>
                          {p_emailid}logged {p_id} in as {p_fullName}
                        </h3>
                      );
                    }}
                  </Consumer> */}
                </React.Fragment>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
export default CourseContent;

import React, { Component } from 'react';
import logo from './gk_img.jpg';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';

import { ADD_CATEGORY } from '../Category/gql/Mutations';

class PracticeSetItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="card" style={{ margin: '5px' }}>
          <Link to={`/courses/${this.props.routeURL}`}>
            <img
              className="card-img-top"
              src="/images/gk_img.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{this.props.title}</h5>
              <p className="card-text">{this.props.author}</p>
            </div>
          </Link>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {this.props.isFree ? (
                <ApolloConsumer>
                  {client => (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        client
                          .mutate({
                            mutation: ADD_CATEGORY,
                            variables: { id: this.props.id },
                            refetchQueries: ['AllCategories']
                          })
                          .then(resp => {
                            console.log(resp);
                          })
                          .catch(error => {
                            console.log(error);
                          });
                      }}
                    >
                      Add
                    </button>
                  )}
                </ApolloConsumer>
              ) : (
                <button className="btn btn-danger">Add To Cart</button>
              )}
              <span>
                <strong className="text-right">
                  {this.props.isFree ? 'Free' : this.props.rate}
                </strong>
              </span>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default PracticeSetItem;

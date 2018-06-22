import gql from 'graphql-tag';
// create the query from string as graphql query using gql tag import
export const LATEST_COURSES = gql`
  query getPracticeSets {
    getPracticeSets {
      id
      description
      authorName
      isFree
      rate
      routeURL
    }
  }
`;

import gql from 'graphql-tag';
// create the query from string as graphql query using gql tag import
export const GET_CATEGORY_LIST = gql`
  query AllCategories {
    allCategories {
      id
      category
      createdby
    }
  }
`;

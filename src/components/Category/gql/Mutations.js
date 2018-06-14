import gql from 'graphql-tag';
export const ADD_CATEGORY = gql`
  mutation addCategory($input: CategoryInput) {
    addCategory(input: $input) {
      id
      category
    }
  }
`;
export const DELETE_CATEGORY = gql`
  mutation delCategory($id: ID) {
    delCategory(id: $id) {
      message
    }
  }
`;

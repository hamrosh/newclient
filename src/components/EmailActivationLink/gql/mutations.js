import gql from 'graphql-tag';
export const ACTIVATE_USER = gql`
  mutation activateUser($id: ID!) {
    activateUser(id: $id) {
      id
      emailid
    }
  }
`;

import gql from 'graphql-tag';

export const USER_EXISTS = gql`
  query UserExists($emailid: String, $password: String) {
    UserExists(emailid: $emailid, password: $password) {
      message
    }
  }
`;

import gql from 'graphql-tag';

export const ADD_APP_USER = gql`
  mutation addAppUser($input: AppUserInput) {
    addAppUser(input: $input) {
      id
      emailid
    }
  }
`;

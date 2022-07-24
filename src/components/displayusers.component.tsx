import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query Users {
    users {
    id
    nickname
    email
    }
  }
`;

function DisplayUsers() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;

  return data.users.map(({ id, nickname, email }: {id: number, nickname: string, email: string}) => (
    <div key={id}>
      <h3>nickname:{nickname}</h3>
      <p>email:{email}</p>
      <br />
    </div>
  ));
}


export default DisplayUsers;
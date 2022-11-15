import { useQuery } from '@apollo/client';

import { Q_USERS } from "../apollo/Operations";

function DisplayUsers() {
  const { loading, error, data } = useQuery(Q_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;

  return data.users.map(({ id, nickname, email, avatar_src }: {id: number, nickname: string, email: string, avatar_src: string | null}) => (
    <div key={id}>
      <h3>nickname:{nickname}</h3>
      <p>email:{email}</p>
      <p>avatar:{avatar_src}</p>
      <br />
    </div>
  ));
}


export default DisplayUsers;
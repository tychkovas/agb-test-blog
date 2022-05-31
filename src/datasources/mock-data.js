const data = {
  posts: [
    {
      id: '1',
      title: 'post title 1',
      body: 'post body 1',
      authorId: '1',
      // author: User
      published_at: () => new Date(Date.UTC(2017, 0, 10, 21, 33, 15, 233)),
    },
    {
      id: '2',
      title: 'post title 2',
      authorId: '2',
      body: 'post body 2',
      published_at: () => new Date(Date.UTC(2018, 0, 10, 21, 33, 15, 233)),
    },
  ],

  users: [
    {
      id: '1',
      nickname: 'User nickname 1',
      email: 'user1@mail.com',
      password: 'password1',
    },
    {
      id: '2',
      nickname: 'User nickname 2',
      email: 'user2@mail.com',
      password: 'password2',
    },
  ],
};

module.exports = data;

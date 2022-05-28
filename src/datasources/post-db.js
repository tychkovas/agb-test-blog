const dataSource = require('./mock-data');

class PostAPI  {
  constructor() {
  }

  getPosts() {
    return dataSource.posts;
  }
  getPost(id) {
    return dataSource.posts.find(post => post.id === id);
  }

  getUsers() {
    return dataSource.users;
  }
  getUser(id) {
    return dataSource.users.find(user => user.id === id);
  }
}

module.exports = PostAPI;

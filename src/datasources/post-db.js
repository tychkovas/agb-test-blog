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

  createPost(post) {
    console.log('PostAPI createPost:', post);
    post.id = String(dataSource.posts.length);
    post.title = `${post.title} ${post.id}`;
    post.body = `${post.body} ${post.id}`;
    if (!post?.published_at)
      post.published_at = new Date(Date.now());
    dataSource.posts.push(post);
    console.log('PostAPI createPost out ', dataSource.posts.length, dataSource.posts[dataSource.posts.length-1].title);
    return post;
  }

  updatePost(id, post) {
    console.log('PostAPI:updatedPost id, post:', id, post);
    const index = dataSource.posts.findIndex(post => post.id == id);
    console.log('PostAPI:updatedPost index', id, index);
    if (~index) {
      dataSource.posts[index] = {...dataSource.posts[index], ...post};
    } else {
      throw new Error('not find post');
    }
    console.log('PostAPI updatePost out:', dataSource.posts[index]);
    return dataSource.posts[index];
  }

  deletePost(id) {
    console.log('PostAPI:deletePost:id:', id);
    const index = dataSource.posts.findIndex(post => post.id == id);
    const post = dataSource.posts[index];
    console.log('PostAPI:deletePost:index:', index);
    if (~index) {
      dataSource.posts.splice(index, 1);
    } else {
      throw new Error('not find post');
    }
    if (!dataSource.posts[index]?.published_at)
      dataSource.posts[index].published_at = new Date(Date.now());
    console.log('PostAPI:deletePost:result:findIndex:', dataSource.posts.findIndex(post => post.id == id));
    return post;
  }
}

module.exports = PostAPI;

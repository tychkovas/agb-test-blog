const { posts, users } = require('./mock-data');

class PostAPI  {
  constructor() {
  }

  getPosts() {
    return posts;
  }
  getPost(id) {
    return posts.find(post => post.id === id);
  }

  getUsers() {
    return users;
  }
  getUser(id) {
    return users.find(user => user.id === id);
  }

  createPost(post) {
    console.log('PostAPI createPost:', post);
    post.id = String(posts.length);
    post.title = `${post.title} ${post.id}`;
    post.body = `${post.body} ${post.id}`;
    if (!post?.published_at)
      post.published_at = new Date(Date.now());
    posts.push(post);
    console.log('PostAPI createPost out ', posts.length, posts[posts.length-1].title);
    return post;
  }

  updatePost(id, post) {
    console.log('PostAPI:updatedPost id, post:', id, post);
    const index = posts.findIndex(post => post.id == id);
    console.log('PostAPI:updatedPost index', id, index);
    if (~index) {
      posts[index] = {...posts[index], ...post};
    } else {
      throw new Error('not find post');
    }
    console.log('PostAPI updatePost out:', posts[index]);
    return posts[index];
  }

  deletePost(id) {
    console.log('PostAPI:deletePost:id:', id);
    const index = posts.findIndex(post => post.id == id);
    const post = posts[index];
    console.log('PostAPI:deletePost:index:', index);
    if (~index) {
      posts.splice(index, 1);
    } else {
      throw new Error('not find post');
    }
    if (!posts[index]?.published_at)
      posts[index].published_at = new Date(Date.now());
    console.log('PostAPI:deletePost:result:findIndex:', posts.findIndex(post => post.id == id));
    return post;
  }
}

module.exports = PostAPI;

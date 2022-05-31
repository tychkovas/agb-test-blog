const { posts, users } = require('./mock-data');

class PostAPI {
  constructor() {
    this.posts = posts;
    this.users = users;
  }

  getPosts() {
    return this.posts;
  }

  getPost(id) {
    return this.posts.find((post) => post.id === id);
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  createPost(_post) {
    const post = _post;
    console.log('PostAPI createPost:', post);
    post.id = String(posts.length);
    post.title = `${post.title} ${post.id}`;
    post.body = `${post.body} ${post.id}`;
    if (!post?.published_at) post.published_at = new Date(Date.now());
    this.posts.push(post);
    console.log('PostAPI createPost out ', this.posts.length, this.posts[this.posts.length - 1].title);
    return post;
  }

  updatePost(id, _post) {
    const post = _post;
    console.log('PostAPI:updatedPost id, post:', id, post);
    const index = this.posts.findIndex((item) => item.id === id);
    console.log('PostAPI:updatedPost index', id, index);
    // eslint-disable-next-line no-bitwise
    if (~index) {
      this.posts[index] = { ...this.posts[index], ...post };
    } else {
      throw new Error('not find post');
    }
    console.log('PostAPI updatePost out:', this.posts[index]);
    return this.posts[index];
  }

  deletePost(id) {
    console.log('PostAPI:deletePost:id:', id);
    const index = this.posts.findIndex((post) => post.id === id);
    const post = this.posts[index];
    console.log(`PostAPI:deletePost:index: ${index}`);
    if (index >= 0) {
      this.posts.splice(index, 1);
    } else {
      throw new Error('not find post');
    }
    if (!posts[index]?.published_at) this.posts[index].published_at = new Date(Date.now());
    console.log('PostAPI:deletePost:result:findIndex:', this.posts.findIndex((item) => item.id === id));
    return post;
  }
}

module.exports = PostAPI;

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  let likes = 0;
  for (let blog of blogs) {
    likes += blog.likes;
  }
  return likes;
};

const favoriteBlog = blogs => {
  let maxLikes = 0;
  let favoriteBlog;
  for (let blog of blogs) {
    if (maxLikes < blog.likes) {
      maxLikes = blog.likes;
      favoriteBlog = blog;
    }
  }
  return favoriteBlog;
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return undefined;
  let authors = {};
  for (let blog of blogs) {
    const { author } = blog;
    if (!authors[author]) {
      authors[author] = 0;
    }
    authors[author] += 1;
  }

  let maxBlogs = 0;
  let authorWithMostBlogs = "";
  for (let author in authors) {
    if (authors[author] > maxBlogs) {
      authorWithMostBlogs = author;
      maxBlogs = authors[author];
    }
  }
  return {
    author: authorWithMostBlogs,
    blogs: maxBlogs,
  };
};

const mostLikes = blogs => {
  if (blogs.length === 0) return undefined;
  const authors = {};
  for (let blog of blogs) {
    const { author } = blog;
    if (!authors[author]) {
      authors[author] = 0;
    }
    authors[author] += blog.likes;
  }

  let maxLikes = 0;
  let authorWithMostLikes = "";
  for (let author in authors) {
    if (authors[author] > maxLikes) {
      authorWithMostLikes = author;
      maxLikes = authors[author];
    }
  }

  return {
    author: authorWithMostLikes,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

module.exports = function(collection, tags, currentUrl) {
  if (!tags || !tags.length) return [];

  return collection.filter(post => {
    if (post.url === currentUrl) return false;
    if (!post.data.tags) return false;
    return post.data.tags.some(tag => tags.includes(tag));
  });
};

const {
  getArticles,
  getArticle,
  createArticle
} = require('./controller');

module.exports = [
  {
    url: "/articles",
    name: "article.list",
    method: "get",
    controller: getArticles
  },
  {
    url: "/articles/:articleId",
    name: "article.detail",
    method: "get",
    controller: getArticle
  },
  {
    url: "/articles",
    name: "article.create",
    method: "post",
    controller: createArticle
  },
]

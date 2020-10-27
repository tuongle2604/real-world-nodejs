const {
  ARTICLE_LIST,
  ARTICLE_DETAIL,
  ARTICLE_COUNT,
  ARTICLE_CREATE
} = require("common");
const uuid = require("uuid");

const getArticles = async (data) => {
  const [articles, total] = await Promise.all([
    ARTICLE_LIST(data),
    ARTICLE_COUNT(data)
  ]);

  const articlesCount = total[0].articlesCount;
  return { articles, articlesCount };
};

const getArticle = ({ articleId }) => ARTICLE_DETAIL(articleId);

const createArticle = async ({ article }) => {
  const slug = uuid.v4();
  article.tagList = article.tagList.join(",");
  const result = await ARTICLE_CREATE({ ...article, slug });
  const articleDetail = await ARTICLE_DETAIL(result.insertId);

  return { article: articleDetail[0] };
};

module.exports = {
  getArticles,
  getArticle,
  createArticle
}

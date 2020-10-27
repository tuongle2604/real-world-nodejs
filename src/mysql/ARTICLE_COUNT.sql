SELECT COUNT(id) AS articlesCount
FROM article
LIMIT {{limit}}
OFFSET {{offset}}

const pool = require("./mysql");
const fs = require("fs");
const mysqlDir = SOURCE_DIR + "/mysql";
const filesName = fs.readdirSync(mysqlDir).filter(o => o.includes(".sql"));

const queries = {};
for (const fileName of filesName) {
  const content = fs.readFileSync(mysqlDir + '/' + fileName).toString();
  const query = content.replace(/{{(.*?)}}/, "?");
  const fnName = fileName.replace(/\.sql$/, "");

  queries[fnName] = (...arg) => new Promise((resolve, reject) => {
    pool.query(query, arg, (error, results, fields) => {
      if (error) throw error;

      return resolve(results)
    })
  })
}

module.exports = queries;

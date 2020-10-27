const pool = require("./mysql");
const fs = require("fs");
const mysqlDir = SOURCE_DIR + "/mysql";
const filesName = fs.readdirSync(mysqlDir).filter(o => o.includes(".sql"));

const queries = {};
for (const fileName of filesName) {
  const content = fs.readFileSync(mysqlDir + '/' + fileName).toString();
  const fnName = fileName.replace(/\.sql$/, "");

  const regexFindArgs = new RegExp(/{{(.+?)}}/g);
  let args = content.match(regexFindArgs) || [];
  args = args.map(o => o.replace(/({|})/g, ""));

  const query = content.replace(regexFindArgs, "?");

  queries[fnName] = (params) => new Promise((resolve, reject) => {
    args = args.map(key => params[key] || params);

    pool.query(query, args, (error, results, fields) => {
      if (error) throw error;

      return resolve(results)
    })
  })
}

module.exports = queries;

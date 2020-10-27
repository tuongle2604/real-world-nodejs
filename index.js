const figlet = require("figlet");
const restfulService = require("./src/server");
process.env.TZ = 'UTC';

figlet('Real World Nodejs', (err, data) => {
  console.log(data);

  const service = restfulService();
  service.listen(3000);
});

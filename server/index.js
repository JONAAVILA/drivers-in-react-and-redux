const server = require("./src/server");
const { conn } = require('./src/db.js');
const teamsToDb = require('./src/services/teamsToDb.js');
const PORT = '0.0.0.0';

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  teamsToDb();
})
}).catch(error => console.error(error))


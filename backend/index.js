const express = require("express");
const app = express();

require("./startup/database")();
require("./startup/routes")(app);

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
  const server = app.listen(port);
  console.log(`Server listening on port ${port}`);
  module.exports = server;
}

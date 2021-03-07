// _O: API Creator
const createRouteFile = require("./createRouteFile");
const initiliazeRoutesDirectory = require("./initilizeRoutesDirectory");
const appendToRouteFile = require( "./appendToRouteFile");
const appendToServerFile = require( "../server/appendToServerFile");
const declareAll = require( "../utils/declareAll");

// MAIN FUNC
module.exports = ({ api }) => {
    initiliazeRoutesDirectory();
    appendToServerFile(declareAll({ express:"express", server: "express()" }));
    // DEBUG: api[...]
    // console.log(`API:`, api);

    // FOR EACH ENDPOINT IN FILE:
    Object.keys(api).forEach(async (endPoint) => {
      // DEBUG: api[endpoints]
      console.log(`End-Point: /api/${endPoint}`);
      // See "./createRouteFile.js"
     appendToRouteFile(
        endPoint,
        declareAll({"{Router}":'require("express")', "router":"Router()"})
      );
     appendToServerFile(
        `const ${endPoint} = require("./routes/api/${endPoint}");\nserver.use('/api/${endPoint}', ${endPoint});`
      );
     createRouteFile(endPoint, api[endPoint]);
    });
  }

// EXTRAS:
// {api: {users}} = api.users = '/api/users' = ./routes/api/users.js - Default is 'api'

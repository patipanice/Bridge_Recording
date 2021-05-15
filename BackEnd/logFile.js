var fs = require("fs");

const createFile = () => {
  fs.appendFile("./log/gameMatch1.txt", "Hello content!", function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};



module.exports = {createFile};
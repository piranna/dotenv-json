const {readFileSync} = require("fs");
const {resolve} = require("path");


module.exports = function dotenvJSON({encoding = 'utf8', path} = {}) {
  if(!path) path = resolve(process.cwd(), '.env.json');

  try {
    const parsed = JSON.parse(readFileSync(path, {encoding}));

    const {env} = process
    for (const key in parsed) {
      if (!env.hasOwnProperty(key)) {
        env[key] = parsed[key];
      }
    }

    return {parsed};
  } catch (error) {
    return {error};
  }
};

'use strict'
let qiniu = require("qiniu")
let glob = require("glob")
let path = require("path")
let conf = require("../local/cdn.json")

qiniu.conf.ACCESS_KEY = conf.ACCESS_KEY
qiniu.conf.SECRET_KEY = conf.SECRET_KEY

function getToken(key) {
  return new qiniu.rs.PutPolicy(conf.BUCKET + ":" + key).token();
}

function uploadFile(key, path) {
  qiniu.io.putFile(getToken(key), key, path, new qiniu.io.PutExtra(), function(err, ret) {
    if (err) {
      console.log(err);    
    } else {
      console.log("upload " + key + " completed.");  
    }
  });
}

function _require (module) {
  delete require.cache[require.resolve(module)]
  return require(module);
}

module.exports = function (cb) {
  let dir = path.join(__dirname, "../public")
  let re = new RegExp("^" + dir + "\/")
  let hash = _require("./hash.json")

  glob.sync(dir + "/**/*.*")
  .forEach(path => {
    let key = path.replace(re, "")

    if (/^(css|img|js)\//.test(key)) {
      key = key.replace(/\.[^\/]+$/, function (m) { return "." + hash + m})
    }
    uploadFile(key, path)
  })
}
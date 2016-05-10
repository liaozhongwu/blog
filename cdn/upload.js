'use strict'
let qiniu = require("qiniu")
, glob = require("glob")
, path = require("path")
, conf = require("../local/cdn.json")

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

function start (cb) {
  let dir = path.join(__dirname, "../public")
  , re = new RegExp("^" + dir + "\/")
  , hash = require("./hash.json")

  glob.sync(dir + "/**/*.*")
  .forEach(path => {
    let key = path.replace(re, "")

    // ignore baidu/google/sitemap
    if (/^(baidu|google|sitemap)/.test(key)) {
      return;
    }
    // add hash
    if (/^(page|css|img|js)\//.test(key)) {
      key = key.replace(/\.[^\/]+$/, function (m) { return "." + hash + m})
    }
    uploadFile(key, path)
  })
}

if (module === require.main) {
  start()
} else {
  module.exports = start
}
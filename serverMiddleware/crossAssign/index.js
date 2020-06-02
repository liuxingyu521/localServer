/**
 * 解决跨域问题的中间件
 */

module.exports = dealWithCrossAssign

function dealWithCrossAssign(options) {

  return function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Credentials", true);

    next();
  };
}

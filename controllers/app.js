module.exports = function(router, app) {

  router.route('/')
    .get(function(req, res) {
      res.send("lol");
    });

};
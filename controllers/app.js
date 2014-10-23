module.exports = function(router, app) {

  router.route('/')
    .get(function(req, res) {
      res.render("app/index");
    });

};
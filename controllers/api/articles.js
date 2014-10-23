module.exports = function(router, app) {

  router.route('/articles')
    .get(function(req, res) {
      res.send([
        {
          title: "TEST",
          body: "test2",
          id: 1
        },
        {
          title: "TEST",
          body: "test3",
          id: 2
        }
      ])
    });

};
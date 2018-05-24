
// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/first.html"));
  });
  
  app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, "../public/login.html"))
  });
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  app.get("/p-blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/p-blog.html"))
  });

  app.get("/students", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/students.html"));
  });

  app.get("/parent",function(req, res) {
    res.sendFile(path.join(__dirname, "../public/parent.html"));
  });

};

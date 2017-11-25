exports.myMiddleware = (req, res, next) => {
  req.name = 'Mark';
  next();
};
exports.homePage = (req, res) => {
  res.render('index');
};

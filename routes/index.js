const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // res.send(req.query);
  res.render('hello', {
    name: "Mark",
    dog: "Snickers"
  });
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;

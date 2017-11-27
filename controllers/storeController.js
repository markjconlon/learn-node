const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

exports.addStore = (req, res) => {
  // allows us to use same template for add and edit store
  res.render('editStore', {title: 'Add Store 💩🚁'})
}

// you either have to wrap async await functions in a try catch or
// through an errorHandler function which is in errorHandlers.js line 9
exports.createStore = async (req, res) => {
  // passes request from body of the add store form with name etc.
  // strict only allows the data we are looking for
  const store = new Store(req.body);
  // sends the data to mongoose and sends back if it was successful or errors
  await store.save();
  console.log('It worked!');
}

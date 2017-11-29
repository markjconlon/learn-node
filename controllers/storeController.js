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
  // sends the data to mongoose and sends back if it was successful or errors
  const store = await (new Store(req.body)).save();
  req.flash('success', `Sucessfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};


exports.getStores = async (req, res) => {
  // query database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores: stores });
}

exports.editStore = async (req, res) => {
  // find the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  // Confirm ther are the owner of the store
  // TODO
  // Render out the edit form so the user can update their store
  res.render('editStore', {title: `Edit ${store.name}`, store: store });
}

exports.updateStore = async (req, res) => {
  // find and update the store
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true, //return the new store instead of the updated one
    runValidators: true
  }).exec();
  req.flash('succes', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`);
  res.redirect(`/stores/${store._id}/edit`);
  // redirect them to the store and tell them that it worked
}

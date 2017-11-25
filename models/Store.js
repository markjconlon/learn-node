const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    // pass a string so it is returned if user doesn't name the store
    // the string is truthy so it acts like "required: true"
    required: 'Please Enter a store name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  // means we will be passing an array of strings
  tags: [String]
});

// have to use a proper function because you need this
// .pre makes this run before the save
storeSchema.pre('save', function(next){
  if (!this.isModified('name')){
    next(); //skip if its being modified and not creating a new Store
    return; // exits the function
  }
  this.slug = slug(this.name);
  next();
  // TODO make more resilient so slugs are unique
})

// can do this if it is the main thing you are exporting
module.exports = mongoose.model('Store', storeSchema)

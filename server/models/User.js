const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Buddy = require('./Buddy');
const Message = require('./Message');
const Profile = require('./Profile');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    isAdmin: {
      type: Boolean,
      default: false,
      immutable: true
    },
    profile: Profile,
    // set savedBuddies to be an array of data that adheres to the profileSchema
    savedBuddies: [Buddy],
    savedMessages: [Message]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// hash user password
userSchema.pre('findOneAndUpdate', async function (next) {
  const saltRounds = 10;
  this._update.password = await bcrypt.hash(this._update.password, saltRounds);

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

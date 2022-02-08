const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     const userData = await User.findOne({ _id: context.user._id });
    //     return userData;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    user: async () => {
      return await User.find();
    },
    // getUsers: async (parent, args, context) => {
    //   console.log("resolvers Query getUsers context.user: ", context.user);
    //   if (context.user) {
    //     const userData = await User.find({ _id: context.user._id });
    //     return userData;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      console.log("User is sirned up and logged in: ", user.username);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log("loginUser Mutation, user: ", user);

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      console.log("User logged in: ", user.username);

      return { token, user };
    },

    saveBuddy: async (parent, { buddyData }, context) => {
      console.log("saveBuddy for user: ", context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBuddies: buddyData } },
          {new: true}
        );

        console.log("saveBuddy updatedUser: ", updatedUser);

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    saveProfile: async (parent, { profileData }, context) => {
      console.log("saveProfile Mutation for user: ", profileData);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { profile: profileData },
          {new: true}
        );

        console.log("saveProfile updatedUser: ", updatedUser);

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeBuddy: async (parent, { buddyId }, context) => {
      if (context.user) {

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBuddies: {buddyId} } }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

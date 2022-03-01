const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { ConversationGroup } = require('../models');
const { ConversationBuddy } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    users: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.find();
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    groups: async (parent, args, context) => {
      const groupsData = await ConversationGroup.find();
      console.log("groupsData:",groupsData)
      return groupsData;
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      if (user.username === 'ADMIN') {
        user.isAdmin = true;
      }
      return { token, user };
    },

    deleteUser: async (parent, { username }, context) => {
      if (context.user) {
        console.log("Deleting user: ",username);
        const user = await User.findOneAndDelete({ username });

        return user;
      }
      throw new AuthenticationError('No user found with this email address');
    },

    createGroup: async (parent, {groupName, ownerName}) => {
      console.log("createGroup with",groupName,"for",ownerName);
      const group = await ConversationGroup.create({ groupName, ownerName });
      console.log("group:",group);
      return { group };
    },

    saveBuddy: async (parent, { buddyData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBuddies: buddyData } },
          {new: true}
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    addBuddy: async (parent, { buddyData }, context) => {
      const updatedCGroup = await ConversationGroup.findOneAndUpdate(
        { groupName: buddyData.groupName },
        { $push: { conversationBuddies: buddyData.buddyName } },
        {new: true}
      );
console.log("addBuddy:",buddyData);
console.log("updatedCGroup:",updatedCGroup);
      return updatedCGroup;
      throw new AuthenticationError('You need to be logged in!');
    },
    
    saveMessage: async (parent, { messageData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { username: messageData.messageTo },
          { $push: { savedMessages: messageData }},
          {new: true}
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteMessage: async (parent, { messageData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMessages: messageData } }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    saveProfile: async (parent, { profileData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { profile: profileData },
          {new: true}
        );

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

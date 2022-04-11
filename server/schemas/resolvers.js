const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { ConversationGroup } = require('../models');
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
        // console.log("Query for GET_USERS, returning:",userData);
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    getAllGroups: async (parent, args, context) => {
      if (context.user) {
        const allGroupsData = await ConversationGroup.find();
        // console.log("Query for GET_ALL_GROUPS, returning:",allGroupsData);
        return allGroupsData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    myGroups: async (parent, args, context) => {
      if (context.user) {
        const myGroupsData = await ConversationGroup.find(
          { ownerName: context.user.username }
        );
        // console.log("myGroupsData:",myGroupsData);
        return myGroupsData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    getGroup: async (parent, {groupName}, context) => {
      if (context.user) {
        // console.log("getGroup resolver, groupName:",groupName);
        const groupData = await ConversationGroup.findOne(
          { groupName }
        );
        // console.log("getGroup resolver, groupData:", groupData);
        return groupData;
      }
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
        // console.log("Deleting user: ",username);
        const user = await User.findOneAndDelete({ username });

        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    createGroup: async (parent, {groupName, ownerName}) => {
      // console.log("createGroup with",groupName,"for",ownerName);
      const group = await ConversationGroup.create({ groupName, ownerName });
      // console.log("group:",group);
      return group;
    },

    deleteGroup: async (parent, { groupName }, context) => {
      if (context.user) {
        // console.log("Deleting group: ",groupName);
        const group = await ConversationGroup.findOneAndDelete({ groupName });

        return group;
      }
      throw new AuthenticationError('You need to be logged in!');
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
        { $addToSet: { conversationBuddies: buddyData } },
        {new: true}
      );
// console.log("addBuddy:",buddyData);
// console.log("updatedCGroup:",updatedCGroup);
      return updatedCGroup;
    },
    
    saveMessage: async (parent, { messageData }, context) => {
      if (context.user) {
        // console.log("in resolver saveMessage, messageData:",messageData);
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
    
    removeBuddy: async (parent, { buddyName }, context) => {
      if (context.user) {

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBuddies: {buddyName} } }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

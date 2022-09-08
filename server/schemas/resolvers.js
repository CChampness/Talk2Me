const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { ConversationGroup } = require('../models');
const { signToken } = require('../utils/auth');
const { sendPWResetEmail } = require("../utils/sendPWResetEmail");
const auth = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    getUser: async (parent, {username}, context) => {
      if (context.user) {
        const otherUserData = await User.findOne({username: username});
        // console.log("Query for GET_USER for:",username);
        // console.log("Query for GET_USER, returning:",otherUserData);
        return otherUserData;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    emails: async (parent, args, context) => {
      // if (context.user) {
        const emailData = await User.find();
        console.log("Query for GET_ALL_EMAILS, returning:",emailData);
        return emailData;
      // }
      // throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    users: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.find();
        // console.log("Query for GET_USERS, returning:",userData);
        return userData;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    getAllGroups: async (parent, args, context) => {
      if (context.user) {
        const allGroupsData = await ConversationGroup.find();
        // console.log("Query for GET_ALL_GROUPS, returning:",allGroupsData);
        return allGroupsData;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    myGroups: async (parent, args, context) => {
      if (context.user) {
        const myGroupsData = await ConversationGroup.find(
          { ownerName: context.user.username }
        );
        // console.log("myGroupsData:",myGroupsData);
        return myGroupsData;
      }
      throw new AuthenticationError('!You need to be logged in to access this feature');
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
      throw new AuthenticationError('You need to be logged in to access this feature!');
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
      throw new AuthenticationError('You need to be logged in to access this feature!');
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
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    // Add Buddy to User
    saveBuddy: async (parent, { buddyData, whoToLookUp }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { username: whoToLookUp },
          { $addToSet: { savedBuddies: buddyData } },
          {new: true}
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    // Add Buddy to ConversationGroup
    addBuddy: async (parent, {buddyData}, context) => {
      const updatedCGroup = await ConversationGroup.findOneAndUpdate(
        { groupName: buddyData.groupName },
        { $addToSet: { conversationBuddies: buddyData } },
        {new: true}
      );
console.log("addBuddy buddyData:",buddyData);
console.log("updatedCGroup:",updatedCGroup);
      return updatedCGroup;
    },
    
    saveMessage: async (parent, { messageData }, context) => {
      if (context.user) {
        console.log("in resolver saveMessage, context.user:",context.user);
        console.log("in resolver saveMessage, messageData:",messageData);
        const updatedUser = await User.findOneAndUpdate(
          { username: messageData.messageTo },
          { $push: { savedMessages: messageData }},
          {new: true}
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    deleteMessage: async (parent, { messageData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMessages: messageData } }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },
    
    saveProfile: async (parent, { profileData }, context) => {
      // console.log("SAVEpROFILE: profileData, context.user:", profileData, context.user);
      if (context.user) {
        // console.log("saveProfile going for it; user:", context.user);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { profile: profileData },
          {new: true}
        );

        // console.log("saveProfile, updatedUser:", updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    // Remove Buddy from User
    removeBuddy: async (parent, { buddyName, whoToLookUp }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { username: whoToLookUp },
          { $pull: { savedBuddies: {buddyName: buddyName} } },
          {new: true}
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to access this feature!');
    },

    sendEmail: async (parent, {email, name, code}, context ) => {
      // console.log("sendEmail:",email, name, code);
      sendPWResetEmail({email, name, code});
    },

    resetPassword: async (parent, {email, password}, context ) => {
      console.log("resetPassword:",email, password);
      const user = await User.findOneAndUpdate(
        { email: email },
        { password: await auth.hash(password)},
        {new: true}
      );
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const token = signToken(user);
// console.log("resetPassword resolver, user:",user);
      return { token, user };
    },
  },
};

module.exports = resolvers;

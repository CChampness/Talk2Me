import React, {useEffect, useState} from 'react';
// import ReactNbsp from 'react-nbsp';
import {Container, Chip, Grid, TextField, Button} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_USERS } from '../utils/queries';
import { GET_GROUP } from '../utils/queries';
import { DELETE_MESSAGE } from '../utils/mutations';
import { SAVE_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';

const myName = Auth.loggedIn() ? Auth.getProfile().data.username : "not logged in";

const pushUnique = (msgList, newMsg) => {
  let dup = false;
  for (let i = 0; i < msgList.length; i++) {
    if (msgList[i].createdAt === newMsg.createdAt) {
      dup = true;
      break;
    }
  }
  if (!dup) {
    msgList.push(newMsg);
  }
  return msgList;
}

let messageList;
// Pare down the total message list into just the ones we want
const loadMessageList_1 = (messageUser, usersData) => {
  const wkgMsgList = [];
  // console.log("in loadMessageList_1, usersData:", usersData);
  let usrMsgs = usersData.users;
  const wkgMsgList2 = [...wkgMsgList];
  for (let i=0; i < usrMsgs.length; i++) {
    for (let j=0; j < usrMsgs[i].savedMessages.length; j++) {
      if ((usrMsgs[i].savedMessages[j].messageTo === messageUser && usrMsgs[i].savedMessages[j].messageFrom === myName) ||
          (usrMsgs[i].savedMessages[j].messageTo === myName && usrMsgs[i].savedMessages[j].messageFrom === messageUser)) {
        pushUnique(wkgMsgList2, usrMsgs[i].savedMessages[j]);
      }
    }
  }
  wkgMsgList2.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
  return wkgMsgList2;
} //////////// end loadMessageList_1

const loadMessageList_2 = (messageUser, usersData) => {
  const wkgMsgList = [];
  // console.log("in loadMessageList_2, usersData:", usersData);
    
  let usrMsgs = usersData;
//this kills our sort, should do usrMsgs = [...wkgMsgList]
  const wkgMsgList2 = [...messageList];
  for (let i=0; i < usrMsgs.length; i++) {
    if ((usrMsgs[i].messageTo === messageUser && usrMsgs[i].messageFrom === myName) ||
        (usrMsgs[i].messageTo === myName && usrMsgs[i].messageFrom === messageUser)) {
      pushUnique(wkgMsgList2, usrMsgs[i]);
    }
  }
  wkgMsgList2.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
  return wkgMsgList2;
} //////////// end loadMessageList_2

function GroupMessages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  // In this context (Group), messageUser is the name of the group.
  const { messageUser, msgTgtType } = useGlobalContext();
  const [text, setText] = useState("");
  const [saveMessage] = useMutation(SAVE_MESSAGE);
  // const { loading, error, data, refetch } = useQuery(GET_USERS,
    // {pollInterval: 1000});
  const allUsersData = useQuery(GET_USERS,
      {pollInterval: 1000});
  const groupData = useQuery(GET_GROUP,
      {variables: {groupName: messageUser}});
  const [needUpdate, setNeedUpdate] = useState(1);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const groupName = messageUser;

  const sendChatMessage = async (e) => {
    const recipientList = [
      ...groupData.data.getGroup.conversationBuddies,
      // {buddyName: groupData.data.getGroup.ownerName}  // Sending to self!
    ];
    console.log("recipientList:", recipientList);
    for (let i=0; i < recipientList.length; i++) {
      try {
        const messageToSend = {
          messageFrom: myName,
          messageText: text,
          messageTo: recipientList[i].buddyName,
          groupName: groupName
        };

        let result;
        // console.log("In sendChatMessage, messageToSend: ",messageToSend);
        result = await saveMessage({
          variables: { messageData: messageToSend },
          onCompleted: allUsersData.refetch
        });
// console.log("callin loadMessageList_2 AFTER saveMessage, result:",result);
        if(result &&
          result.data &&
          result.data.saveMessage) {
            messageList = loadMessageList_2(messageUser, result.data.saveMessage.savedMessages);
        }
        console.log("messageList after loadMessageList_2:",messageList);
      } catch (err) {
        console.error(err);
      }
    }
    setNeedUpdate(needUpdate+1);
    setText("");
  }; ////////// end sendChatMessage

  if (allUsersData.loading) return <h4>Loading...</h4>;
// let allUsersData = data;
let myUserMsgs;
let myGroupMsgs = [];
console.log("messageUser:",messageUser);
console.log("allUsersData:",allUsersData.data);
console.log("GroupMessages, groupData:",groupData);
  allUsersData.data.users.map((user) => {
    console.log("allUsersData.users.username:", user.username);
    if(user.username === myName) {
      myUserMsgs = user.savedMessages;
      myUserMsgs.map((msg) => {
        if (msg.groupName === messageUser) {
          myGroupMsgs = [...myGroupMsgs, msg];
        }
      })
    }
  });
  console.log("myUserMsgs:", myUserMsgs);
  console.log("myGroupMsgs:", myGroupMsgs);

// Get an array of all of the others in the group, without me.
// myName may or may not be the owner of the group.
  if (needUpdate == 1) {
    messageList = loadMessageList_1(messageUser, allUsersData.data);
  }
//  setMessageList(newMsgList);
messageList = myGroupMsgs;
console.log("messageList after myGroupMsgs:",messageList);

return(
    <Container>
      <h5>Messaging with group {messageUser}</h5>
      {/* <h6>Need update {needUpdate}</h6> */}
      {!messageList.length ? <h4>No messages</h4> : null}
      <div style={{marginBottom:"5rem"}}>
        {messageList.map((msg, ndx)=> (
          <div key={ndx} style={{textAlign: msg.messageFrom===myName?"right":"left"}}>
            <p style={{marginBottom:"0.3rem"}}>{msg.messageFrom}</p>
            <Chip style={{fontSize:"0.9rem"}} color={msg.messageFrom===myName?"primary": "secondary"} label={msg.messageText}/>
          </div>
        ))}
      </div>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TextField onChange={(e)=>{
            setText(e.target.value)}} value={text} size="small" fullWidth variant="outlined" required label="Required" label="Enter message here" />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={sendChatMessage} fullWidth  variant="contained" style={{backgroundColor:"#60a820", color:"white"}}>Send</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default GroupMessages

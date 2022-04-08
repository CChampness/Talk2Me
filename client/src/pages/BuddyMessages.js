import React, {useEffect, useState} from 'react';
// import ReactNbsp from 'react-nbsp';
import {Container, Chip, Grid, TextField, Button} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_USERS } from '../utils/queries';
import { DELETE_MESSAGE } from '../utils/mutations';
import { SAVE_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';

const myName = Auth.loggedIn() ? Auth.getProfile().data.username : "not logged in";
const groupName = "none";

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
        if (!usrMsgs[i].savedMessages[j].groupName || usrMsgs[i].savedMessages[j].groupName==="none")
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
      if (!usrMsgs[i].groupName || usrMsgs[i].groupName==="none") {
        pushUnique(wkgMsgList2, usrMsgs[i]);
      }
    }
  }
  wkgMsgList2.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
  return wkgMsgList2;
} //////////// end loadMessageList_2

function BuddyMessages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const [text, setText] = useState("");
  const [saveMessage] = useMutation(SAVE_MESSAGE);
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [needUpdate, setNeedUpdate] = useState(1);

  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  // const [messageList, setMessageList] = useState([]);
  const { messageUser, msgTgtType } = useGlobalContext();

  const sendChatMessage = async (e) => {
    try {
      const messageToSend = {
        messageFrom: myName,
        messageText: text,
        messageTo: messageUser,
        groupName: groupName
      };

      let result;
      // console.log("In sendChatMessage, messageToSend: ",messageToSend);
      result = await saveMessage({
        variables: { messageData: messageToSend },
        onCompleted: refetch
      });
// console.log("callin loadMessageList_2 AFTER saveMessage, result:",result);
      if(result &&
        result.data &&
        result.data.saveMessage) {
          messageList = loadMessageList_2(messageUser, result.data.saveMessage.savedMessages);
      }
      console.log("BuddyMessages messageList after loadMessageList_2:",messageList);
    } catch (err) {
      console.error(err);
    }
    setNeedUpdate(needUpdate+1);
    setText("");
  }; ////////// end sendChatMessage

  if (loading) return <h4>Loading...</h4>;
let allUsersData = data;
// console.log("data:",data);
  // const currentTime = new Date().toLocaleDateString();
  // console.log("allUsersData:",allUsersData);
  if (needUpdate == 1) {
    messageList = loadMessageList_1(messageUser, allUsersData);
  }
//  setMessageList(newMsgList);
console.log("BuddyMessages messageList after loadMessageList_1:",messageList);

  return(
    <Container>
      <h5>Messaging with buddy {messageUser}</h5>
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

export default BuddyMessages

import React, { useState} from 'react';
import {Container, Grid, TextField, Button} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_GROUP } from '../utils/queries';
import { DELETE_MESSAGE } from '../utils/mutations';
import { SAVE_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';

const myName = Auth.loggedIn() ? Auth.getProfile().data.username : "not logged in";

const niceDate = (uglyDate) => {
  const time = new Date(parseInt(uglyDate)).toLocaleTimeString();
  const date = new Date(parseInt(uglyDate)).toLocaleDateString();
  return time +" on "+ date;
}

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

const loadMessageList_2 = (messageUser, usersData) => {
  let usrMsgs = usersData;
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
  const myUserData = useQuery(GET_ME, {pollInterval: 1000});
  const groupData = useQuery(GET_GROUP, {variables: {groupName: messageUser}});
  const [needUpdate, setNeedUpdate] = useState(1);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const groupName = messageUser;

  const sendChatMessage = async (e) => {
    const recipientList = [
      ...groupData.data.getGroup.conversationBuddies,
      {buddyName: groupData.data.getGroup.ownerName}  // Sending to self
    ];

    for (let i=0; i < recipientList.length; i++) {
      try {
        const messageToSend = {
          messageFrom: myName,
          messageText: text,
          messageTo: recipientList[i].buddyName,
          groupName: groupName
        };

        let result = await saveMessage({
          variables: { messageData: messageToSend },
          onCompleted: myUserData.refetch
        });

        if(result &&
          result.data &&
          result.data.saveMessage) {
            messageList = loadMessageList_2(messageUser, result.data.saveMessage.savedMessages);
        }
      } catch (err) {
        console.error(err);
      }
    }
    setNeedUpdate(needUpdate+1);
    setText("");
  }; ////////// end sendChatMessage

  if (myUserData.loading || groupData.loading) return <h4>Loading...</h4>;
  console.log("myUserData:", myUserData);
  let myGroupMsgs = [];
  myUserData.data.me.savedMessages.map((msg) => {
    if (msg.groupName === messageUser) {
      myGroupMsgs = [...myGroupMsgs, msg];
    }
  });
  // When this loop finishes, it will contain the list of all of this user's messages
  // withing the given group, both sent and received

  if (needUpdate === 1) {}

  messageList = myGroupMsgs.reverse();

  return(
    <Container>
      <p style={{marginBottom:"0.3rem"}}>Messaging with group <span style={{fontSize:"1.3rem"}}>{messageUser}</span></p>
      {!messageList.length ? <h4>No messages</h4> : null}
      <div style={{marginBottom:"5rem"}}>
        {messageList.map((msg, ndx)=> (
          <div key={ndx} style={{textAlign: msg.messageFrom===myName?"right":"left"}}>
            <p style={{marginBottom:"0.3rem"}}>{msg.messageFrom} <span style={{fontSize:"0.8rem"}}>at {niceDate(msg.createdAt)}</span></p>
            <TextField
              className={msg.messageFrom===myName?"blueText": "redText"}
              width 
      				type='text' 
			      	value={msg.messageText}
              multiline
		       		variant='outlined'
			      	inputProps={
					      { readOnly: true,
                  width: "50%",
                }
				      }
              InputProps={{
                style: {
                    color: "white"
                }
              }}
			      />
          </div>
        ))}
      </div>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TextField
            className="whiteText"
            onChange={(e)=>{setText(e.target.value)}}
            value={text}
            multiline
            size="small"
            fullWidth
            variant="outlined"
            label="Enter new message here"
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={sendChatMessage}
            fullWidth
            variant="contained"
            style={{backgroundColor:"#60a820", color:"white"}}
          >Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default GroupMessages

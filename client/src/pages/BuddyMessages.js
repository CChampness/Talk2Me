import React, {useState} from 'react';
import {Container, Grid, TextField, Button} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_USER } from '../utils/queries';
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

function BuddyMessages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const { messageUser, msgTgtType } = useGlobalContext();
  const [text, setText] = useState("");
  const [saveMessage] = useMutation(SAVE_MESSAGE);
  const myUserData = useQuery(GET_ME, {pollInterval: 1000});
  const otherUserData = useQuery(
    GET_USER,
    {variables: {username: messageUser}},
    {pollInterval: 1000}
  );
  const [needUpdate, setNeedUpdate] = useState(1);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const sendChatMessage = async (e) => {
      try {
        const messageToSend = {
          messageFrom: myName,
          messageText: text,
          messageTo: messageUser,
          groupName: "none"
        };

        let result = await saveMessage({
          variables: { messageData: messageToSend },
          onCompleted: myUserData.refetch,
          onCompleted: otherUserData.refetch
        });

        if(result &&
          result.data &&
          result.data.saveMessage) {
            messageList = loadMessageList_2(messageUser, result.data.saveMessage.savedMessages).reverse();
          }
      } catch (err) {
        console.error(err);
      }

    setNeedUpdate(needUpdate+1);
    setText("");
  }; ////////// end sendChatMessage

  if (myUserData.loading || otherUserData.loading) return <h4>Loading...</h4>;
  console.log("myUserData:", myUserData);
  let myBuddyMsgs = [];
  // When this loop finishes, it will contain the list of all messages
  // directly from messageUser to this user.
  myUserData.data.me.savedMessages.map((msg) => {
    if (msg.groupName === "none" && msg.messageFrom === messageUser) {
      myBuddyMsgs = [...myBuddyMsgs, msg];
    }
  });

  // When this next loop finishes, it will have to the list all messages
  // directly from this user to messageUser.
  if (otherUserData.data.getUser) {
    otherUserData.data.getUser.savedMessages.map((msg) => {
      if (msg.groupName === "none" && msg.messageFrom === myName) {
        myBuddyMsgs = [...myBuddyMsgs, msg];
      }
    });
  }

  if (needUpdate == 1) {};

  messageList = myBuddyMsgs.sort(
    (a,b) => a.createdAt < b.createdAt ? 1 : -1);

  return(
    <Container>
      <p style={{marginBottom:"0.3rem"}}>Messaging with user <span style={{fontSize:"1.3rem"}}>{messageUser}</span></p>
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

export default BuddyMessages

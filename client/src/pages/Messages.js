import React, {useEffect, useState} from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { GET_MY_GROUPS } from '../utils/queries';
import { ADD_BUDDY } from '../utils/mutations';
import { CREATE_GROUP } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';

// TWO BUGS
// 1. "none" is displayed as if it were an actual group
// 2. Need to force refresh of buddy list whenever we come into this component.
//    Currently, if you select a new buddy in FindBuddies, then come directly
//    into this component, the new buddy is not displayed.

// The state gets changed in the Nav component
function Messages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const meData = useQuery(GET_ME);
  const myGroupData = useQuery(GET_MY_GROUPS);
  // const [createGroup] = useMutation(CREATE_GROUP);
  // const [addBuddy] = useMutation(ADD_BUDDY);
  const [currentUserName, setCurrentUserName] = useState('');
  const [selectedTgtType, setSelectedTgtType] = useState([]);
  const { setMessageUser, messageUser, setMsgTgtType, msgTgtName, msgTgtType } = useGlobalContext();
  const [groupNameInp, setGroupNameInp] = useState('');
  const [ownerNameInp, setOwnerNameInp] = useState('');

  // set initial form state
  const [groupInfo, setGroupInfo] = useState({
    groupName: '',
    ownerName: ''
  });
  
  const handleSelection = async (e) => {
    e.preventDefault();
    // Go to a page for either buddy messages or group messages
    // and pass the target name via context
    if (selectedTgtType === "buddy") {
      pageChange('BuddyMessages');
    } else {
      pageChange('GroupMessages');
    }
  }

  const handleTgtChange = e => {
    e.persist();
    // setMsgTgtName(e.target.id);
    setMessageUser(e.target.id);
    setMsgTgtType(e.target.value);
    setSelectedTgtType(e.target.value);
    // selectedTgtName = e.target.id;
  };

  if (meData.loading || myGroupData.loading) {
    return <h4>Loading...</h4>;
  }

  if (meData.error) return <h4>Error! {meData.error.message}</h4>;
  if (myGroupData.error) return <h4>Error! {myGroupData.error.message}</h4>;

  if (!currentUserName) {
    setCurrentUserName(Auth.getProfile().data.username);
  }

  console.log("in Messages, meData.data.me.savedMessages:",meData.data.me.savedMessages);
  console.log("in Messages, meData.data.me.savedBuddies:",meData.data.me.savedBuddies);
  let myGroups = myGroupData.data.myGroups;
  console.log("1) in Messages, myGroups:",myGroups);
  let savedMessages = [] = meData.data.me.savedMessages;
  savedMessages.map((msg) => {
    console.log("msg.groupName:",msg.groupName);
    if (msg.groupName) {
      if (myGroups.filter(grp => grp.groupName === msg.groupName).length == 0) {
        myGroups = [...myGroups, {groupName: msg.groupName}];
      }
    }
  });
  console.log("2) in Messages, myGroups:",myGroups);

  return (
    <Container>
      <h4>Select the buddy or group that you want to message with</h4>
      <hr/>
      <h5>Your buddies</h5>
      <>
        {!meData.data.me.savedBuddies.length ?
          <h3>No conversation buddies chosen yet!</h3>
        :
        <Form onSubmit={handleSelection}>
          <Form.Group>
          {meData.data.me.savedBuddies.map((buddy, ndx) => (
            <div key={ndx} className="mb-3">
              <Form.Check className="rads"
                name="msgTarget"
                id={buddy.buddyName}
                label={buddy.buddyName}
                onChange = {handleTgtChange}
                type='radio'
                value="buddy"
              />
            </div>
          ))}
      <h5>Your groups</h5>
          {myGroups.map((group, ndx) => (
            (group.groupName && group.groupName !== "none") ?
            (<div key={ndx} className="mb-3">
              <Form.Check className="rads"
                name="msgTarget"
                id={group.groupName}
                label={group.groupName}
                onChange={handleTgtChange}
                type='radio'
                value="group"
              />
            </div>)
            :
            null)
          )}
          </Form.Group>
          <Button
            type='submit'
            variant='success'
          >
            GO TO MESSAGES
          </Button>
        </Form>
        }
      </>
    </Container>
  );
}

export default Messages

Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@CChampness 
CChampness
/
Talk2Me
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Talk2Me/client/src/pages/Messages.js /
@CChampness
CChampness Adding 2-way texting
Latest commit 05d1850 3 days ago
 History
 1 contributor
118 lines (108 sloc)  3.75 KB
   
import React, {useEffect, useState} from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
// import { GET_GROUPS } from '../utils/queries';
import { GET_MY_GROUPS } from '../utils/queries';
import { ADD_BUDDY } from '../utils/mutations';
import { CREATE_GROUP } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';

// let selectedTgtName;

// The state gets changed in the Nav component
function Messages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const meData = useQuery(GET_ME);
  const myGroupData = useQuery(GET_MY_GROUPS);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [addBuddy] = useMutation(ADD_BUDDY);
  const [currentUserName, setCurrentUserName] = useState('');
  const [selectedTgtType, setSelectedTgtType] = useState([]);
  const { setMessageUser, messageUser, setMsgTgtType, msgTgtName, msgTgtType } = useGlobalContext();
  const [groupNameInp, setGroupNameInp] = useState('');
  const [ownerNameInp, setOwnerNameInp] = useState('');
  // const [groupItem, setGroupItem] = useState({ selectedGroup: ""});
  // const [buddyItem, setBuddyItem] = useState({ selectedBuddy: ""});
  // const [buddyItem, setBuddyItem] = useState({ buddyItem: ""});

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

  if (meData.error) return <h4>{meData.error.message}</h4>;
  if (myGroupData.error) return <h4>{myGroupData.error.message}</h4>;

  if (!currentUserName) {
    setCurrentUserName(Auth.getProfile().data.username);
  }

  return (
    <Container>
      <h3>Select the buddy or group that you want to message with</h3>
      <hr/>
      <h4>Your buddies</h4>
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
                id={buddy.buddyId}
                label={buddy.buddyId}
                onChange = {handleTgtChange}
                type='radio'
                value="buddy"
              />
            </div>
          ))}
      <h4>Your groups</h4>
          {myGroupData.data.groups.map((group, ndx) => (
            <div key={ndx} className="mb-3">
              <Form.Check className="rads"
                name="msgTarget"
                id={group.groupName}
                label={group.groupName}
                onChange={handleTgtChange}
                type='radio'
                value="group"
              />
            </div>
          ))}
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
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
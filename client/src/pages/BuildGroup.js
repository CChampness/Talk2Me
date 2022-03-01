// Notes: Group function
// Page comes up with a chart of all of the user's current
// buddies.  If none, then show a message that only buddies
// can be invited into the group.
// A user might be in more that one group.
// If the currentUser is already in some groups, they are shown here.
// The currentUser can either hop into one of their groups, or create
// a new group.  The selected group is the currentUser's currentGroup
// for the remainder of the session or until a different group
// is selected.
// To start a group, the currentUser must first give a name for it.
// As soon as the currentUser gives the name to the group, then
// that is the currentUser's currentGroup.
// A user is in only one currentGroup at a time.
// Whoever is the creater of the group is the only one that can
// invite new members into the group.
// The currentGroup will be the people who can join a text chat
// session.
// On the group page, if/when the currentUser pops into a group,
// show a "join conversation" button if there is a chat in progress.
// GET_ME, then get the array of currentUser's Buddies.  Display them.

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

// The state gets changed in the Nav component
function BuildGroup ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const meData = useQuery(GET_ME);
  // const groupData = useQuery(GET_GROUPS);
  const myGroupData = useQuery(GET_MY_GROUPS);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [addBuddy] = useMutation(ADD_BUDDY);
  const [currentUserName, setCurrentUserName] = useState('');
  const { setMessageUser } = useGlobalContext();
  const [groupNameInp, setGroupNameInp] = useState('');
  const [ownerNameInp, setOwnerNameInp] = useState('');
  const [groupItem, setGroupItem] = useState({ selectedGroup: ""});
  const [buddyItem, setBuddyItem] = useState({ selectedBuddy: ""});

  const { selectedBuddy } = buddyItem;
  const { selectedGroup } = groupItem;
    // set initial form state
    const [groupInfo, setGroupInfo] = useState({
      groupName: '',
      ownerName: ''
    });
  
  // useEffect( ( ) => {
  //   if (!loading) {
  //     setCurrentUserName(data.me.username);
  //   }
  // }, [data]);
    
  // let currentGroup = "TBD";

  // create function to handle saving the profile to the database
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setGroupItem({selectedGroup: groupNameInp});

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const groupToCreate = {
        groupName: groupNameInp,
        ownerName: currentUserName
      };
  
      console.log("In handleCreateGroup, groupToCreate: ",groupToCreate);
      const {result} = await createGroup({
        variables: { ...groupToCreate }
      });
      console.log(result);
  
    } catch (err) {
      console.error(err);
    };
  }

  const handleAddBuddies = async (e) => {
    e.preventDefault();
    console.log("selectedBuddy:",selectedBuddy)

    try {
      const buddyToAdd = {
        groupName: selectedGroup,
        buddyName: selectedBuddy
      };
  
      console.log("In handleAddBuddies, buddyToAdd: ",buddyToAdd);
      const {result} = await addBuddy({
        variables: {buddyData: buddyToAdd}
      });
      console.log("handleAddBuddies result:",result);
  
    } catch (err) {
      console.error(err);
    };
  }

  const handleBuddyChange = e => {
    e.persist();
    console.log("e.target.value:",e.target.value);

    setBuddyItem(prevState => ({
      ...prevState,
      selectedBuddy: e.target.value
    }));
  };

  if (meData.loading || myGroupData.loading) {
    return <h4>Loading...</h4>;
  }

  if (meData.error) return <h4>Error! {meData.error.message}</h4>;
  // if (groupData.error) return <h4>Error! {groupData.error.message}</h4>;
  if (myGroupData.error) return <h4>Error! {myGroupData.error.message}</h4>;

  if (!currentUserName) {
    setCurrentUserName(Auth.getProfile().data.username);
  }

  const handleGroupChange = e => {
    e.preventDefault();
    e.persist();
    console.log(e.target.value);
    // alert(e.target.value)

    setGroupItem(prevState => ({
      ...prevState,
      selectedGroup: e.target.value
    }));
  };

  const handleSelectGroupSubmit = e => {
    e.preventDefault();
    // alert(`${selectedGroup}`)
  }

  console.log("myGroupData.groups:",myGroupData.data.groups);
  console.log("meData:",meData.data);

  return (
    <Container>
      <h3>Select your conversation group</h3>
      {!myGroupData.data.groups.length ?
        <h4>(You have not yet created any groups)</h4>
        :
      <Form onSubmit={handleSelectGroupSubmit}>
        <Form.Group controlId="selectedGroup">
          {myGroupData.data.groups.map((group, ndx) => (
            <div key={ndx} className="mb-3">
              <Form.Check
                value={group.groupName}
                type='radio'
                id={group.groupName}
                label={group.groupName}
                onChange={handleGroupChange}
                checked={selectedGroup === group.groupName}
              />
            </div>
          ))}
          </Form.Group>
          {/* <Button variant="primary" type="submit">
            Submit selected group
          </Button> */}
        </Form>
      }
      <br/>
      <h3>or start a new conversation group</h3>
      <Form onSubmit={handleCreateGroup}>
        <Form.Row>
          <Col xs={12} md={8}>
            <Form.Control
              name='newGroup'
              id='newGroup'
              value={groupNameInp}
              onChange={(e) => setGroupNameInp(e.target.value)}
              type='text'
              size='lg'
              placeholder="New group name"
            />
          </Col>
          <Col xs={12} md={4}>
            <Button type='submit' variant='success' size='lg'>
              Create Group
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <br/><hr/><br/>
      <h3>Add buddies to your selected conversation group: {selectedGroup}</h3>
      <>
        {!meData.data.me.savedBuddies.length ?
          <h3>No conversaion buddies chosen yet!</h3>
        :
        <Form onSubmit={handleAddBuddies}>
          {meData.data.me.savedBuddies.map((buddy, ndx) => (
            <div key={ndx} className="mb-3">
              <Form.Check 
                type='checkbox'
                id={buddy.buddyId}
                label={buddy.buddyId}
                value={buddy.buddyId}
                onChange = {handleBuddyChange}
                checked={selectedBuddy === buddy.buddyId}
              />
            </div>
          ))}
          <Button variant="primary" type="submit">
            Add selected buddies
          </Button>
        </Form>
        }
      </>
    </Container>
  );
}

export default BuildGroup

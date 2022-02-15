import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import dateTime from '../utils/dateFormat';
import { GET_ME } from '../utils/queries';
import { DELETE_MESSAGE } from '../utils/mutations';

// const parseTime = (unixTime) => {
//   var date = new Date(unixTime * 1000);
//   var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

// return formattedTime;
// }

// const parseTime = (unixTime) => {
//   var a = new Date(unixTime * 1000);
//   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//   var year = a.getFullYear();
//   var month = months[a.getMonth()];
//   var date = a.getDate();
//   var hour = a.getHours();
//   var min = a.getMinutes();
//   var sec = a.getSeconds();
//   var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//   return time;
// }

// const parseTime = (unixTime) => {
// return new Date(unixTime).toLocaleDateString("en-US");
// }

// const parseTime = (unixTime) => {
//  const date = unixTime;
//   var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//   var offset = date.getTimezoneOffset() / 60;
//   var hours = date.getHours();

//   newDate.setHours(hours - offset);

//   return newDate.toLocaleString();;   
// }

const parseTime = (unixTime) => {
  var d = new Date(unixTime * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
      ampm = 'AM',
      time;

  if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
  } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
  } else if (hh == 0) {
      h = 12;
  }

  // ie: 2014-03-24, 3:00 PM
  time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
  return time;
}

// The state gets changed in the Nav component
function GetMessages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const {loading, error, data } = useQuery(GET_ME);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [userData, setUserData] = useState([]);

  useEffect( ( ) => {
    if (!loading) {
      setUserData(data.me.savedMessages);
    }
  }, [data]);

  // This function deletes the selected message from the current user's message list
  const handleDeleteMessage = async (message) => {
    console.log("message._id: ", message._id);

    try {
      const messageToDelete = {
        _id: message._id
      };

      console.log("In handleDeleteMessage, messageToDelete: ",messageToDelete);
      const {result} = await deleteMessage({
        variables: { messageData: messageToDelete },
      });

      const filteredMessages = userData.filter((msg) => msg._id !== message._id);
      setUserData(filteredMessages);
    } catch (err) {
      console.error(err);
    }
  }
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
  // data.users is the array of all users in the database
  // console.log("dateTime: ", utils.dateTime('1644850436776'));

  return (
    !userData.length ?
    <h3>No messages!</h3>
    :
    userData.map((msg, ndx) =>
      <div key={ndx} className="card-column">
        <figure className="proj-card">
          <p>Message from: {msg.messageFrom}</p>
          <p>Date sent: {new Date(parseInt(msg.createdAt)).toLocaleDateString()} at {new Date(parseInt(msg.createdAt)).toLocaleTimeString()}</p>
          {/* <p>date:{new Date(parseInt(msg.createdAt)).toLocaleTimeString()}</p> */}
          {/* <p>{msg.createdAt.toLocaleString}</p> */}
          {/* <p>formatted date: {formattedTimeStamp}</p> */}
          <p>{msg.messageText}</p>
          <Button
            type='submit'
            variant='success'
            onClick={() => handleDeleteMessage(msg)}>
            DELETE MESSAGE
          </Button>
        </figure>
      </div>
    )
  )
}

export default GetMessages


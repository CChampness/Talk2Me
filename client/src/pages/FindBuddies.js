import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_USERS } from '../utils/queries';
import { GET_ME } from '../utils/queries';

  // The state gets changed in the Nav component
  function FindBuddies ({ currentPage, handleChange }) {
    const {loading, error, data } = useQuery(GET_USERS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log("data: ",data);
    const userData = data?.user || {};
  
    return (
      <h1>user data</h1>
    )

    // return (
    //   projList.map((proj, ndx) =>
    //     <div key={ndx} className={(ndx === 0) ? "top-card" : "card-column"}>
    //       <figure className="proj-card">
    //         <span data-descr>
    //           <a onClick={() => handleChange(proj.id)}>
    //             <h4 className="card-title">{proj.title}</h4>
    //           </a>
    //         </span>
    //       </figure>
    //     </div>
    //   )
    // )
  }

export default FindBuddies;

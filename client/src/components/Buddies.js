import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBuddies from '../pages/SearchBuddies';
import SavedBuddies from '../pages/SavedBuddies';
import Navbar from '../components/Navbar';

import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const Buddies = () => {
  return (
   <>
      <Navbar />

    <Switch>
      <Route exact path='/' component={SearchBuddies} />
      <Route exact path='/saved' component={SavedBuddies} />
      <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
    </Switch>
    </>
  );
};

export default Buddies;

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchProfiles from '../pages/SearchProfiles';
import SavedProfiles from '../pages/SavedProfiles';
import Navbar from '../components/Navbar';

import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const Buddies = () => {
  return (
   <>
      <Navbar />

    <Switch>
      <Route exact path='/' component={SearchProfiles} />
      <Route exact path='/saved' component={SavedProfiles} />
      <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
    </Switch>
    </>
  );
};

export default Buddies;

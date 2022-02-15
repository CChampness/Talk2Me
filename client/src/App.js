import React, { useState, useContext } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up the client to execute the `authLink` middleware 
  // before making the request to the GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [currentPage, setCurrentPage] = useState('About');
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <Main currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <Footer />
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;

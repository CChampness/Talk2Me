import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { SAVE_BOOK, SAVE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';
// import { saveBook, searchGoogleBooks } from '../utils/API';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const oldCreateProfile = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our input field data
  const [interestInput, setInterestInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [saveBook] = useMutation(SAVE_BOOK);
  const [saveProfile] = useMutation(SAVE_PROFILE);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => savedProfileIds(savedProfileIds);
  // });

  // create method to search for Language Buddies and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("handleFormSubmit");

    if (!interestInput && !nameInput) {
      return false;
    }
    console.log("handleFormSubmit, going to saveProfile");
    console.log("interests: ",interestInput);
    console.log("name: ",nameInput);

    try {
      const {result} = await saveProfile({
        variables: { profileId : "profile1" } 
      });
      console.log("saveProfile returned: ",result);
    } catch (err) {
      console.error(err);
    }
  };

  // // create function to handle saving a book to our database
  // const handleSaveBook = async (bookId) => {
  //   // find the book in `searchedBooks` state by the matching id
  //   const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const {result} = await saveBook({
  //       variables: { bookData: { ...bookToSave } },
  //     });
  //     console.log("bookToSave.bookId:",bookToSave.bookId);
  //     // if book successfully saves to user's account, save book id to state
  //     setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  //     console.log("savedBookIds:",savedBookIds);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Create your profile!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='interestInput'
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your main interest?'
                />
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  name='nameInput'
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your name?'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Create Profile
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      {/* <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a language buddy to begin'}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container> */}
    </>
  );
};

export default CreateProfile;

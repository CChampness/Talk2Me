import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBuddies = () => {
  const [ refresh, setRefresh ] = useState();
  const {loading, data } = useQuery(GET_ME);
  console.log("data: ",data);
  const userData = data?.me || {};
  const [removeBook, {error}] = useMutation(REMOVE_BOOK);

  // function to accept the book's mongo _id value as param and
  // deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {returned_data} = await removeBook({
        variables: {bookId}
      });
window.location.reload(false);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved profiles!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBuddies.length
            ? `Viewing ${userData.savedBuddies.length} saved ${userData.savedBuddies.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved profiles!'}
        </h2>
        <CardColumns>
          {userData.savedBuddies.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBuddies;

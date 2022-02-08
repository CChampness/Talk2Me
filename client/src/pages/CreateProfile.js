import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { SAVE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';

const CreateProfile = () => {
  // create state for holding our search field data
  const [nameInp, setNameInp] = useState('');
  const [interestsInp, setInterestsInp] = useState('');
  const [languageInp, setLanguageInp] = useState('');
  const [readingLevelInp, setReadingLevelInp] = useState('');
  const [writingLevelInp, setWritingLevelInp] = useState('');
  const [grammarLevelInp, setGrammarLevelInp] = useState('');
  const [pronunciationLevelInp, setPronunciationLevelInp] = useState('');
  const [sexInp, setSexInp] = useState('');
  const [ageInp, setAgeInp] = useState('');
  const [countryFromInp, setCountryFromInp] = useState('');
  const [countryNowInp, setCountryNowInp] = useState('');
  const [contactInfoInp, setContactInfoInp] = useState('');

  const [saveProfile] = useMutation(SAVE_PROFILE);

  // create function to handle saving the profile to the database
  const handleSaveProfile = async () => {

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const profileToSave = {
        name: nameInp,
        interests: interestsInp,
        language: languageInp,
        readingLevel: readingLevelInp,
        writingLevel: writingLevelInp,
        grammarLevel: grammarLevelInp,
        pronunciationLevel: pronunciationLevelInp,
        sex: sexInp,
        age: ageInp,
        countryFrom: countryFromInp,
        countryNow: countryNowInp,
        contactInfo: contactInfoInp
      };

      console.log("In handleSaveProfile, profileToSave: ",profileToSave);
      const {result} = await saveProfile({
        variables: { profileData: profileToSave },
      });

      // if buddy successfully saves to user's account, save buddy id
      // to state
      // setSavedBuddyIds([...savedBuddyIds, buddyToSave.buddyId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <Container>
          <h2>Create your profile</h2>
          <Form onSubmit={handleSaveProfile}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='name'
                  value={nameInp}
                  onChange={(e) => setNameInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your name?'
                />
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  name='interests'
                  value={interestsInp}
                  onChange={(e) => setInterestsInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What are your main interests?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='language'
                  value={languageInp}
                  onChange={(e) => setLanguageInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What langage are you practicing?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='readingLevel'
                  value={readingLevelInp}
                  onChange={(e) => setReadingLevelInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your reading level?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='writingLevel'
                  value={writingLevelInp}
                  onChange={(e) => setWritingLevelInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your writing level?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='grammarLevel'
                  value={grammarLevelInp}
                  onChange={(e) => setGrammarLevelInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your grammar level?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='pronunciationLevel'
                  value={pronunciationLevelInp}
                  onChange={(e) => setPronunciationLevelInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your pronunciation level?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='sex'
                  value={sexInp}
                  onChange={(e) => setSexInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your sex?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='age'
                  value={ageInp}
                  onChange={(e) => setAgeInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your age?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='countryFrom'
                  value={countryFromInp}
                  onChange={(e) => setCountryFromInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What country are you from?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='countryNow'
                  value={countryNowInp}
                  onChange={(e) => setCountryNowInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What country are you in now?'
                />
              </Col>

              <Col xs={12} md={8}>
                <Form.Control
                  name='contactInfo'
                  value={contactInfoInp}
                  onChange={(e) => setContactInfoInp(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What is your contact information?'
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
    </>
  );
};

export default CreateProfile;

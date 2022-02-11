import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { SAVE_PROFILE } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
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
  const {loading, error, data } = useQuery(GET_ME);

  console.log("data: ",data);
  const userData = data?.me || {};

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

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;

  // set the placeholders to be the values from the query (if any)
  console.log("userData: ",userData);
  const prof = data.me.profile;
    
  const namePlaceholder = (prof&&prof.name)?prof.name:'What is your name?'
  const interestsPlaceholder = (prof&&prof.interests)?prof.interests:'What are your main interests?'
  const languagePlaceholder = (prof&&prof.language)?prof.language:'What langage are you practicing?'
  const readingLevelPlaceholder = (prof&&prof.readingLevel)?prof.readingLevel:'What is your reading level?'
  const writingLevelPlaceholder = (prof&&prof.writingLevel)?prof.writingLevel:'What is your writing level?'
  const grammarLevelPlaceholder = (prof&&prof.grammarLevel)?prof.grammarLevel:'What is your grammar level?'
  const pronunciationLevelPlaceholder = (prof&&prof.pronunciationLevel)?prof.pronunciationLevel:'What is your pronunciation level?'
  const sexPlaceholder = (prof&&prof.sex)?prof.sex:'What is your sex?'
  const agePlaceholder = (prof&&prof.age)?prof.age:'What is your age?'
  const countryFromPlaceholder = (prof&&prof.countryFrom)?prof.countryFrom:'What country are you from?'
  const countryNowPlaceholder = (prof&&prof.countryNow)?prof.countryNow:'What country are you in now?'
  const contactInfoPlaceholder = (prof&&prof.contactInfo)?prof.contactInfo:'What is your contact information?'

  // let nameAttr;
  // if (prof.name) {nameAttr = prof.name} else {nameAttr = nameInp};
  // if (prof.interests) setInterestsInp(prof.interests);
  // if (prof.language) setNameInp(prof.name); languageInp,
  // if (prof.readingLevel) setNameInp(prof.name); readingLevelInp,
  // if (prof.writingLevel) setNameInp(prof.name); writingLevelInp,
  // if (prof.grammarLevel) setNameInp(prof.name); grammarLevelInp,
  // if (prof.pronunciationLevel) setNameInp(prof.name); pronunciationLevelInp,
  // if (prof.sex) setNameInp(prof.name); sexInp,
  // if (prof.age) setNameInp(prof.name); ageInp,
  // if (prof.countryFrom) setNameInp(prof.name); countryFromInp,
  // if (prof.countryNow) setNameInp(prof.name); countryNowInp,
  // if (prof.contactInfo) setNameInp(prof.name); contactInfoInp

  return (
    <Container>
      <h2>My profile</h2>
      <Form onSubmit={handleSaveProfile}>
        <Form.Row>
          <Col xs={12} md={8}>
            <Form.Control
              name='name'
              id='name'
              value={nameInp}
              onChange={(e) => setNameInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={namePlaceholder}
            />
          </Col>
          <Col xs={12} md={8}>
            <Form.Control
              name='interests'
              id='interests'
              value={interestsInp}
              onChange={(e) => setInterestsInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={interestsPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='language'
              id='language'
              value={languageInp}
              onChange={(e) => setLanguageInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={languagePlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='readingLevel'
              id='readingLevel'
              value={readingLevelInp}
              onChange={(e) => setReadingLevelInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={readingLevelPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='writingLevel'
              id='writingLevel'
              value={writingLevelInp}
              onChange={(e) => setWritingLevelInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={writingLevelPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='grammarLevel'
              id='grammarLevel'
              value={grammarLevelInp}
              onChange={(e) => setGrammarLevelInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={grammarLevelPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='pronunciationLevel'
              id='pronunciationLevel'
              value={pronunciationLevelInp}
              onChange={(e) => setPronunciationLevelInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={pronunciationLevelPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='sex'
              id='sex'
              value={sexInp}
              onChange={(e) => setSexInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={sexPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='age'
              id='age'
              value={ageInp}
              onChange={(e) => setAgeInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={agePlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='countryFrom'
              id='countryFrom'
              value={countryFromInp}
              onChange={(e) => setCountryFromInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={countryFromPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='countryNow'
              id='countryNow'
              value={countryNowInp}
              onChange={(e) => setCountryNowInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={countryNowPlaceholder}
            />
          </Col>

          <Col xs={12} md={8}>
            <Form.Control
              name='contactInfo'
              id='contactInfo'
              value={contactInfoInp}
              onChange={(e) => setContactInfoInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={contactInfoPlaceholder}
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
  );
};

export default CreateProfile;


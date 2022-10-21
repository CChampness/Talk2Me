import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { SAVE_PROFILE } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';

const CreateProfile = () => {
  // create states for holding our search field data
  const [interestsInp, setInterestsInp] = useState('');
  const [languageInp, setLanguageInp] = useState('');
  // const [readingLevelInp, setReadingLevelInp] = useState('');
  // const [writingLevelInp, setWritingLevelInp] = useState('');
  // const [grammarLevelInp, setGrammarLevelInp] = useState('');
  // const [pronunciationLevelInp, setPronunciationLevelInp] = useState('');
  // const [sexInp, setSexInp] = useState('');
  // const [ageInp, setAgeInp] = useState('');
  const [countryFromInp, setCountryFromInp] = useState('');
  const [countryNowInp, setCountryNowInp] = useState('');
  const [resourcesInp, setResourcesInp] = useState('');
  // const [contactInfoInp, setContactInfoInp] = useState('');
  const {loading, error, data } = useQuery(GET_ME);

  const [saveProfile] = useMutation(SAVE_PROFILE);

  // create function to handle saving the profile to the database
  const handleSaveProfile = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const profileToSave = {
        interests: interestsInp,
        language: languageInp,
        readingLevel: "",
        writingLevel: "",
        grammarLevel: "",
        pronunciationLevel: "",
        sex: "",
        age: "",
        countryFrom: countryFromInp,
        countryNow: countryNowInp,
        resources: resourcesInp,
        contactInfo: ""
      };

      console.log("In handleSaveProfile, profileToSave: ", profileToSave);
      const {result} = await saveProfile({
      // await saveProfile({
        variables: { profileData: profileToSave },
      });

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  // set the placeholders to be the values from the query (if any)
  const prof = data.me.profile;
    
  const interestsPlaceholder = (prof&&prof.interests)?prof.interests:'What are your main interests?'
  const languagePlaceholder = (prof&&prof.language)?prof.language:'What langage are you practicing?'
  // const readingLevelPlaceholder = (prof&&prof.readingLevel)?prof.readingLevel:'What is your reading level?'
  // const writingLevelPlaceholder = (prof&&prof.writingLevel)?prof.writingLevel:'What is your writing level?'
  // const grammarLevelPlaceholder = (prof&&prof.grammarLevel)?prof.grammarLevel:'What is your grammar level?'
  // const pronunciationLevelPlaceholder = (prof&&prof.pronunciationLevel)?prof.pronunciationLevel:'What is your pronunciation level?'
  // const sexPlaceholder = (prof&&prof.sex)?prof.sex:'What is your sex?'
  // const agePlaceholder = (prof&&prof.age)?prof.age:'What is your age?'
  const countryFromPlaceholder = (prof&&prof.countryFrom)?prof.countryFrom:'What country are you from?'
  const countryNowPlaceholder = (prof&&prof.countryNow)?prof.countryNow:'What country do you live in now?'
  const resourcesPlaceholder = (prof&&prof.resources)?prof.resources:'Do you have some links or resources that you would like to share?'
  // const contactInfoPlaceholder = (prof&&prof.contactInfo)?prof.contactInfo:'What is your contact information?'

  return (
    <Container>
      <h2>Profile for {Auth.getProfile().data.username}</h2>
      <Form onSubmit={handleSaveProfile}>
        <Form.Row>
          <Col xs={2}>
            Interests:
          </Col>
          <Col xs={10}>
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

          <Col xs={2}>
            Language:
          </Col>
          <Col xs={10}>
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

          <Col xs={2}>
            Country from:
          </Col>
          <Col xs={10}>
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

          <Col xs={2}>
            Country now:
          </Col>
          <Col xs={10}>
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

          <Col xs={2}>
            Resources:
          </Col>
          <Col xs={10}>
            <Form.Control
              name='resources'
              id='resources'
              value={resourcesInp}
              onChange={(e) => setResourcesInp(e.target.value)}
              type='text'
              size='lg'
              placeholder={resourcesPlaceholder}
            />
          </Col>

          <Col xs={4}></Col>
          <Col xs={4}>
            <Button type='submit' variant='success' size='lg'>
              Create Profile
            </Button>
          </Col>
          <Col xs={4}></Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default CreateProfile;


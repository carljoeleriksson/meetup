import React from 'react';
import CreateMeetupForm from '../components/CreateMeetupForm';
import MeetUpList from '../components/MeetUpList';

function HomePage() {
  return <>
    <CreateMeetupForm/>
    <MeetUpList />
    </>
}

export default HomePage;

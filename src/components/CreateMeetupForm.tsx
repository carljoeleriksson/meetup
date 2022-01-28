import React from 'react';

function todaysDate() {
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  return date
}

function CreateMeetupForm() {
    return <>
        <h2>Create Meetup</h2>
        <form >
            <label htmlFor="date-input">Date</label>
            <input 
                id="date-input" 
                type="date" 
                value={todaysDate()}
            />
        </form>
    
    
    </>
}

export default CreateMeetupForm

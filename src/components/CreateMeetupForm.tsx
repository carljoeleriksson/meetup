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
            <label htmlFor="title-input">Title</label>
            <input 
                id="title-input" 
                type="text" 
            />
            <label htmlFor="date-input">Date</label>
            <input 
                id="date-input" 
                type="date" 
                value={todaysDate()}
            />
            <label htmlFor="time-input">Time</label>
            <input 
                id="time-input" 
                type="time"
            />
            <label htmlFor="desc-input">Description</label>
            <input 
                id="desc-input" 
                type="textarea" 
            />
            <label htmlFor="host-input">Host</label>
            <input 
                id="host-input" 
                type="text" 
            />
            <label htmlFor="cat-input">Category</label>
            <input 
                id="cat-input" 
                type="text" 
            />
            <label htmlFor="img-input">Image</label>
            <input 
                id="img-input" 
                type="text" 
            />
            <button className='create-btn' type="submit">Create Meetup</button>   
        </form>
    
    
    </>
}

export default CreateMeetupForm

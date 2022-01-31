import React from 'react';
import {useNavigate} from 'react-router-dom'

function todaysDate() {
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  return date
}



function CreateMeetupForm() {
    function handleSubmit(e: any) {
            e.preventDefault()
  
            const existingMeetups = JSON.parse(localStorage.getItem('meetUp-List')??'[]')
            //Get highest id in array and later give the new meetup highestId + 1
            const arrOfIds = existingMeetups.map((meetup:any)=>{console.log(meetup.Id); return meetup.Id})
            let highestId=Math.max(...arrOfIds) ?? 0;

            const target = e.target as typeof e.target & {
                title: { value: string },
                date: { value: Date },
                time: { value: string },
                description: { value: string },
                host: { value: string },
                category: { value: string },
                image: { value: string },
              };
            
            const newMeetup = {
                Id:  highestId + 1,
                Title: target.title?.value,
                Date: `${target.date?.value} ${target.time?.value}`,
                Description: target.description?.value,
                Host: target.host?.value,
                Category: target.category?.value,
                Image: target.image?.value,
                Attend: false
            }
            
            const newArr: any = [newMeetup, ...existingMeetups];
            /* const newArr: any = []; */
           
            localStorage.setItem('meetUp-List', JSON.stringify(newArr));
    }

    return <>
        <h2>Create Meetup</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title-input">Title</label>
            <input 
                id="title-input"
                name="title" 
                type="text" 
            />
            <label htmlFor="date-input">Date</label>
            <input 
                id="date-input" 
                name="date"
                type="date" 
                placeholder={todaysDate()}
            />
            <label htmlFor="time-input">Time</label>
            <input 
                id="time-input"
                name="time" 
                type="time"
            />
            <label htmlFor="desc-input">Description</label>
            <input 
                id="desc-input" 
                name="description"
                type="textarea" 
            />
            <label htmlFor="host-input">Host</label>
            <input 
                id="host-input" 
                name="host"
                type="text" 
            />
            <label htmlFor="cat-input">Category</label>
            <input 
                id="cat-input" 
                name="category"
                type="text" 
            />
            <label htmlFor="img-input">Image</label>
            <input 
                id="img-input" 
                name="image"
                type="text" 
            />
            <button className='create-btn' type="submit">Create Meetup</button>   
        </form>    
    </>
}

export default CreateMeetupForm

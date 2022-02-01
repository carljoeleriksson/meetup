import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

function todaysDate() {
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  return date
}


  function CreateMeetupForm(prop:any) {
     
    const navigate = useNavigate()

   const meetup = prop.meetup

   console.log("meetup#")
   console.log(meetup)

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
                Id: (!meetup) ? highestId + 1 : meetup.Id,
                Title: target.title?.value,
                Date: `${target.date?.value} @ ${target.time?.value}`,
                Description: target.description?.value,
                Host: target.host?.value,
                Category: target.category?.value,
                Image: target.image?.value,
                Attend: false
            }
            let newArr: any = []; 

            if(!meetup){

              newArr = [newMeetup, ...existingMeetups];

            }else {
                // update meetup case

                newArr =   existingMeetups.map((el:any)=>{
 
               if(el.Id == meetup.Id ){
                    el.Title = newMeetup.Title
                    el.Date = newMeetup.Date
                    el.Description = newMeetup.Description
                    el.Host = newMeetup.Host
                    el.Category = newMeetup.Category
                    el.Image = newMeetup.Image

                    el.Attend = newMeetup.Attend

                return el
              }
               
              return el

             })
            }
           
            localStorage.setItem('meetUp-List', JSON.stringify(newArr));

            if(meetup){
                window.location.reload();
            }else {
                navigate('/')
            }
    }

return <>
        <h2>{!meetup ? "Create Meetup" :"Edit Meetup"}  </h2>
        <div className='create-meetup-wrapper'>
           {!meetup && <Link to="/" className='back-btn icon-btn'><FaArrowAltCircleLeft />Back</Link> }
            <form onSubmit={handleSubmit}>
                <label htmlFor="title-input">Title</label>
                <input 
                    id="Id-input"
                    name="Id" 
                    type="hidden"
                    defaultValue={meetup && meetup.Id}                 />
                <input 
                    id="title-input"
                    name="title" 
                    type="text"
                    defaultValue={meetup && meetup.Title} 
                required />
                <label htmlFor="date-input">Date</label>
                <input 
                    id="date-input" 
                    name="date"
                    type="date" 
                    placeholder={todaysDate()}
                    defaultValue={meetup && meetup.Date.split(" @ ")[0]} 

                     />
                <label htmlFor="time-input">Time</label>
                <input 
                    id="time-input"
                    name="time" 
                    type="time"
                    defaultValue={meetup && meetup.Date.split(" @ ")[1]} 
                     />
                <label htmlFor="desc-input">Description</label>
                <input 
                    id="desc-input" 
                    name="description"
                    type="textarea" 

                    defaultValue={meetup && meetup.Description} 
                    required />
                <label htmlFor="host-input">Host</label>
                <input 
                    id="host-input" 
                    name="host"
                    type="text" 
                    defaultValue={meetup && meetup.Host} 

                    required  />
                <label htmlFor="cat-input">Category</label>
                <input 
                    id="cat-input" 
                    name="category"
                    type="text" 
                    defaultValue={meetup && meetup.Category} 

                    required  />
                <label htmlFor="img-input">Image</label>
                <input 
                    id="img-input" 
                    name="image"
                    type="text" 
                    defaultValue={meetup && meetup.Image} 

                    required />
                <button className='create-btn' type="submit">
                    {!meetup ?
                    "Create Meetup"
                       :
                    "Edit Meetup"}
                    </button>   
            </form>    
        </div>
    </>
}

export default CreateMeetupForm

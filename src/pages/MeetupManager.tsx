import React, { useEffect, useState } from 'react';
import CreateMeetupForm from './CreateMeetupForm';

export default function MeetupManager() {


    const [allMeetups, setAllMeetups]: Array<any> = useState([])
    const [meetup, setMeetup]: any  = useState(null)

    const [show, setShow]: any  = useState(false)


  
    const fetchMeetupList = async () => {
        let meetupListFromLocalStorage:any = localStorage.getItem('meetUp-List')
  
        if(!meetupListFromLocalStorage){
            //Get default Meetups from JSON-file
            const importedMeetups = await import("../meetUpList.json");
                  
            let defaultMeetups: Array<any>= []
            defaultMeetups = importedMeetups.default
  
            //Save default meetups in localStorage
            localStorage.setItem('meetUp-List', JSON.stringify(defaultMeetups))
            setAllMeetups(defaultMeetups)
        //    setMeetupList(defaultMeetups)
        } else {
          setAllMeetups(JSON.parse(meetupListFromLocalStorage))
      //    setMeetupList(JSON.parse(meetupListFromLocalStorage))
        }
        
    }
    function removeMeetup(e:any){
        e.preventDefault()

        // console.log(e.target.id)

        const Id = e.target.id



        console.log(allMeetups)

         const updateddMeetups = allMeetups.filter((meetup: any) => 
            meetup.Id != Id
           )

       // console.log(updateddMeetups)

        localStorage.setItem('meetUp-List', JSON.stringify(updateddMeetups))


        setAllMeetups(updateddMeetups)



    }

    function updateMeetup(e:any, meetup:any ){


        e.preventDefault()

        console.log(meetup)


        if(isUpcomingMeetup(meetup) ){

            setMeetup( meetup)

            setShow(true)
    
          }

          else {
            alert(" U can only update upcoming meetup")
          }



        
    }

    function isUpcomingMeetup(meetup:any) {
     
        const now = Date.now()
    
        const dateinMilliSec = Date.parse(meetup.Date)
    
         return dateinMilliSec > now
    
      }
    useEffect(() => {
        try {
            fetchMeetupList()
        }
        catch (e) {
            console.log(e)
        }
      }, [])
    
      return <>
          <div className='nav-sort-wrapper'>
 
    
          </div>
          <div >
          {allMeetups.length > 0 && allMeetups.map((el:any) => (
              <div key={el.Id}>{el.Title}<label id={el.Id} onClick={removeMeetup}>Remove</label><label onClick={(e) => updateMeetup(e , el)}>Update</label></div>
              

       )
       )}
         
          <CreateMeetupForm meetup={meetup}></CreateMeetupForm>

          </div>
       

          
        </>
}

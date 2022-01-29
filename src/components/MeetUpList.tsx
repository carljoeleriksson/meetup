import React, { useEffect, useState } from 'react';
import MeetupCard from './MeetupCard';

export default function MeetUpList() {

  const [meetupList, setMeetupList]: Array<any> = useState([])

  const fetchMeetupList = async () => {
      //Get default Meetups from JSON-file
      const importedMeetups = await import("../meetUpList.json");
      
      let defaultMeetups: Array<any>= []
      defaultMeetups = importedMeetups.default
    
      //Save default meetups in localStorage
      localStorage.setItem('meetUp-List', JSON.stringify(defaultMeetups))

      let meetupListFromLocalStorage:any = localStorage.getItem('meetUp-List')
      
      setMeetupList(await JSON.parse(meetupListFromLocalStorage))
  }

  async function filterUpcomingMeetup() {
    const now = Date.now()
    let updatedData = []

    updatedData = await meetupList.filter(function (el: any) {
      const dateinMilliSec = Date.parse(el.Date)
      return dateinMilliSec >= now
    })

    return updatedData
  }

  async function sortByUpcomingDate(e: any) {
    e.preventDefault();
    setMeetupList([])

    let filteredData = await filterUpcomingMeetup()

    await filteredData.sort((a: any, b: any): any => {
      const dateOfA = Date.parse(a.Date)
      const dateOfB = Date.parse(b.Date)

      return dateOfA - dateOfB
    })

    setMeetupList(filteredData)
  }

  async function sortByCat(e: any) {
    e.preventDefault();
    setMeetupList([])

    await meetupList.sort((a: any, b: any): any => {

      const dateOfA = a.Category
      const dateOfB = b.Category

      const result = (dateOfA > dateOfB) ? 1 : -1
      return result
    })

  }

function renderMeetupList() {
    return meetupList.map((meetup: any) => (
        <MeetupCard {...meetup} key={meetup.Id}/>
    ))
  
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
        <button data-testid="sortByUpcomingDate" className="Btn" onClick={sortByUpcomingDate}>Upcoming Meetup</button>
        <button data-testid="sortByCat" className="Btn" onClick={sortByCat}>Sort By Category</button>
      </div>

      {meetupList.length > 0 && renderMeetupList()}
    </>
    
}

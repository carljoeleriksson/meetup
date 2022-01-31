import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import MeetupCard from './MeetupCard';

export default function MeetUpList() {

  const [allMeetups, setAllMeetups]: Array<any> = useState([])
  const [meetupList, setMeetupList]: Array<any> = useState([])

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
          setMeetupList(defaultMeetups)
      } else {
        setAllMeetups(JSON.parse(meetupListFromLocalStorage))
        setMeetupList(JSON.parse(meetupListFromLocalStorage))
      }
      
  }

function filterFutureMeetups(list: any) {
    const now = Date.now()
    let futureMeetups = []

    futureMeetups = list.filter(function (el: any) {
      const dateinMilliSec = Date.parse(el.Date)
      return dateinMilliSec >= now
    })

    return futureMeetups
  }

function filterPastMeetups(list: any) {
    const now = Date.now()
    let pastMeetups = []

    pastMeetups = list.filter(function (el: any) {
      const dateinMilliSec = Date.parse(el.Date)
      return dateinMilliSec < now
    })

    return pastMeetups
  }

  function sortByDate(e: any) {
    e.preventDefault();
    setMeetupList([])

    let sortedArr = [...allMeetups]

    sortedArr.sort((a: any, b: any): any => {
      const dateOfA = Date.parse(a.Date)
      const dateOfB = Date.parse(b.Date)

      return dateOfA - dateOfB
    })

    setMeetupList(sortedArr)
  }

  async function sortByCat(e: any) {
    
    e.preventDefault();
    setMeetupList([])
    const sortedArr = [...allMeetups]

    sortedArr.sort((a: any, b: any): any => {
      const catA = a.Category
      const catB = b.Category

      const result = (catA > catB) ? 1 : -1
      return result
    })
    setMeetupList(sortedArr)
  }

  function filterAttended(e: any) {
      e.preventDefault()
      setMeetupList([])
      
      const attendedMeetups = allMeetups.filter((meetup: any) => meetup.Attend === true)
      setMeetupList(attendedMeetups)
  }

function renderMeetupList() {
    const futureMeetups = filterFutureMeetups(meetupList)

    return futureMeetups.map((meetup: any) => (
      <MeetupCard {...meetup} key={meetup.Id}/>
    ))
}

function renderPastMeetupList() {
    const pastMeetups = filterPastMeetups(meetupList)
    return pastMeetups.map((meetup: any) => (
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
        <button className="Btn" onClick={sortByDate}>Sort By Date</button>
        <button className="Btn" onClick={sortByCat}>Sort By Category</button>
        <button className="Btn" onClick={filterAttended}>Attended</button>
        <Link to="/create-meetup" className='Btn'>Create Meetup</Link>

      </div>
      <div className='future-meetups'>
          {meetupList.length > 0 && renderMeetupList()}
      </div>
      <hr />

      <div className='past-meetups'>
          <h3>Past Meetups</h3>
          {meetupList.length > 0 && renderPastMeetupList()}
      </div>
      
    </>
    
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './MeetupCard.css'

//interface Props {
//  data: Array<any>
//}

//const MeetupCard: React.FC<Props> = ({ data }: Props) => {

function MeetupCard(props: any) {

  let data = props.data
  const [meetUps, setMeetups]: Array<any> = useState([])
  const navigate = useNavigate()


  async function filterUpcomingMeetup() {

    const now = Date.now()

    let updatedData = []

    updatedData = await data.filter(function (el: any) {

      const dateinMilliSec = Date.parse(el.Date)

      return dateinMilliSec >= now
    })
    return updatedData
  }


  async function sortByUpcomingDate(e: any) {

    e.preventDefault();

    setMeetups([])

    let filteredData = await filterUpcomingMeetup()


    await filteredData.sort((a: any, b: any): any => {

      const dateOfA = Date.parse(a.Date)

      const dateOfB = Date.parse(b.Date)

      return dateOfA - dateOfB


    })

    //console.log(filteredData)

    setMeetups(filteredData)


  }


  async function sortByCat(e: any) {
    e.preventDefault();

    setMeetups([])

    await data.sort((a: any, b: any): any => {

      const dateOfA = a.Category

      const dateOfB = b.Category


      const result = (dateOfA > dateOfB) ? 1 : -1

      return result


    })
    console.log(data)


    setMeetups(data)


  }
  useEffect(() => {


    setMeetups(data)


  }, [data])



  function goToDetails() {
    /* history.push('/details/' + id) */
    /* TEMPORARY */ 
    navigate('/details/1')
  }

  return (
    <>
      <button data-testid="sortByUpcomingDate" className="Btn" onClick={sortByUpcomingDate}>Upcoming Meetup</button>
      <button data-testid="sortByCat" className="Btn" onClick={sortByCat}>Sort By Category</button>

      {meetUps.length > 0 && meetUps.map((el: any) => (
        <div data-testid="singleMeetup" onClick={goToDetails} key={el.Id}>
          <h2>{el.Title}</h2>
          <p><img width="100" height="100" src={el.Image} alt={el.Title} /></p>

          <p className="date" data-testid="date">{el.Date}</p>
          <p className="date" data-testid="cat">{el.Category}</p>

          <p data-testid="description">{el.Description}</p>
          <p data-testid="host" className="host">{el.Host}</p>
        </div>
      ))}


    </>
  )
}

export default MeetupCard;
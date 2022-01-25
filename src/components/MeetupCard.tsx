import React, { useEffect, useState } from 'react';
import './MeetupCard.css'

interface Props {
    data: Array<any>
}

const MeetupCard: React.FC<Props> = ({ data }: Props) => {

    const [meetUps, setMeetups]: Array<any> = useState([])

    function sortBydate(e:any) {
        e.preventDefault();

         data = data.sort((a: any, b: any): any => {

            const dateOfA = Date.parse(a.Date)

            const dateOfB = Date.parse(b.Date)

            //  console.log(dateOfA)
            //  console.log(dateOfB)
            return dateOfA - dateOfB


        })

          setMeetups(data)


    }


    function sortByCat(e:any) {
        e.preventDefault();

        data = data.sort((a: any, b: any): any => {

           const dateOfA = a.Category

           const dateOfB = b.Category

          //      console.log(dateOfA)
        //      console.log(dateOfB)
           
         //    console.log( dateOfA > dateOfB)

             const result = ( dateOfA > dateOfB) ? 1 : -1

             return result


       })
       

         setMeetups(data)


   }
  //  useEffect( () => {

   // }, [])
    return (
        <>
            <button className=""  onClick={sortBydate}>Sort By Date</button>
            <button className="" onClick={sortByCat}>Sort By Category</button>

            {data.map((el: any) => (
                <div key={el.Id}>
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
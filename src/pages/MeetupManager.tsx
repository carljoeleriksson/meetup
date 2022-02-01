import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CreateMeetupForm from './CreateMeetupForm';

export default function MeetupManager() {


    const [allMeetups, setAllMeetups]: Array<any> = useState([])
    const [meetup, setMeetup]: any = useState(null)

    const fetchMeetupList = async () => {
        let meetupListFromLocalStorage: any = localStorage.getItem('meetUp-List')

        if (!meetupListFromLocalStorage) {
            //Get default Meetups from JSON-file
            const importedMeetups = await import("../meetUpList.json");

            let defaultMeetups: Array<any> = []
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
    function removeMeetup(e: any) {

        e.preventDefault()

        const Id = e.target.id

        // console.log(allMeetups)

        const updateddMeetups = allMeetups.filter((meetup: any) =>
            meetup.Id != Id
        )

        localStorage.setItem('meetUp-List', JSON.stringify(updateddMeetups))


        setAllMeetups(updateddMeetups)

    }

    function updateMeetup(e: any, meetup: any) {

        e.preventDefault()


        console.log(meetup)


        if (isUpcomingMeetup(meetup)) {

            setMeetup(meetup)


        }

        else {
            alert(" U can only update upcoming meetup")
        }

    }

    function isUpcomingMeetup(meetup: any) {

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
        <div className='nav-sort-wrapper'  data-testid="meetups-list">
        <Link to="/" className='back-btn icon-btn'><FaArrowAltCircleLeft />Back</Link>

            <h2>Manage your Meetups</h2>

            {allMeetups.length > 0 && allMeetups.map((el: any) => (
                <div className="meetups-list" key={el.Id} data-testid={"meetups-list#" + el.Id}>
                    <div>
                        <h3>{el.Title}</h3>
                        <p>{el.Description}</p>
                        <p>{el.Date}</p>
                    </div>
                    <div>
                        <a href="#" id={el.Id} onClick={removeMeetup} data-testid={ "delete#" + el.Id}>Remove</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => updateMeetup(e, el)} data-testid={ "edit#" + el.Id}> Update</a>
                    </div>

                </div>

            )

            )}
            <div className={meetup ? "show-form" : "hide-form"}>
                <CreateMeetupForm meetup={meetup}></CreateMeetupForm>

            </div>
        </div>

    </>
}

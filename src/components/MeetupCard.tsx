import { useNavigate } from 'react-router-dom'
import './MeetupCard.css'


function MeetupCard(meetup: any) {
  
  let {Id, Date, Title, Description, Host, Image, Category } = meetup
  
  const navigate = useNavigate()

function goToDetails() {
   navigate('/details/' + Id)
  }

  return (<>
        <div data-testid="singleMeetup" onClick={goToDetails} key={Id}>
            <h2>{Title}</h2>
            <p><img width="100" height="100" src={Image} alt={Title} /></p>

            <p className="date" data-testid="date">{Date}</p>
            <p className="date" data-testid="cat">{Category}</p>

            <p data-testid="description">{Description}</p>
            <p data-testid="host" className="host">{Host}</p>
        </div>
        </>
  )
}

export default MeetupCard;
import { useNavigate } from 'react-router-dom'

function MeetupCard(meetup: any) {
  
  let {Id, Date, Title, Description, Host, Image, Category } = meetup
  
  const navigate = useNavigate()

function goToDetails() {
   navigate('/details/' + Id)
  }

  return (<>
        <div className="single-meetup" data-testid="singleMeetup" onClick={goToDetails} key={Id}>
            <img className="card-meetup-img" src={Image} alt={Title} />
            <p className="card-date" data-testid="date">{Date}</p>
            <h2 className="card-title">{Title}</h2>
            <p data-testid="card-host" className="card-host">{`Host: ${Host}`}</p>
            <p className="card-cat" data-testid="cat">{Category}</p>
            <p className="card-desc" data-testid="description">{Description}</p>
        </div>
        </>
  )
}

export default MeetupCard;
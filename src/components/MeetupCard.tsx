import React  from 'react';
import './MeetupCard.css'

interface Props {
    data: Array<any>
}

const MeetupCard: React.FC<Props> = ({ data }: Props) => {

    return (
        <>
            {data.map((el: any) => (
            <div key={el.Id}> 
                <h2>{el.Title}</h2>
                <p><img width="100" height="100" src={el.Image} alt={el.Title}/></p>
 
                <p className="date" data-testid="date">{el.Date}</p>
                <p data-testid="description">{el.Description}</p>
                <p  data-testid="host" className="host">{el.Host}</p>
            </div>
           ))}
        </>
    )
}

export default MeetupCard;
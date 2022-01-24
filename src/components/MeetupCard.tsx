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
                <h2>{el.title}</h2>
                <p className="date" data-testid="date">{el.date}</p>
                <p data-testid="description">{el.description}</p>
                <p className="host">{el.host}</p>
            </div>
           ))}
        </>
    )
}

export default MeetupCard;
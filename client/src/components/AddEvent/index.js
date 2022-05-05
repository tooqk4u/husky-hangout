import React, {useState, useContext} from 'react';
import '../../App.css';
import Event from '../Event/Event';

const AddEvent = () => {
    // hooks
    const [event, setEvent] = useState('Skiing');
    const [time, setTime] = useState('9:00am');

    const { addEvent } = useState(event);
    const { events } = useState(event);

    const onSubmit = e => {
        e.preventDefault();
        
        const newEvent = {
            id: Math.floor(Math.random() * 100000000),
            event,
            time
        }

        addEvent(newEvent);

        // reset the form
        setEvent('');
        setTime('');
      }



    return (
        <div className="Content">
            <div className="Header">
                <div className="Layer">
                    Events
                </div>
            </div>
            <div className="Body">
                <ul className="Event">
                    {event.at(item => (<Event key={item.id} item={item} />))}
                </ul>
                <div className="AddEvent">
                    <form onSubmit={onSubmit}>
                        <input className="eventFiled" value={event} type="text" onChange={(e) => setEvent(e.target.value)} placeholder="New Event" />
                        <input className="eventTime" value={time} type="text" onChange={(e) => setTime(e.target.value)} placeholder="Time" />
                        <button className="submitBtn">Add Event</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEvent;
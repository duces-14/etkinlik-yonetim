import { createContext, useState, useEffect } from 'react'

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const fetchEvents = async () => {
        try{
            const res = await fetch('http://localhost:3001/events');
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error('Veri cekme hatasi !', err);
        }
    };
    
/*    useEffect(() => {
        fetch('http://localhost:3001/events')
        .then((res) => res.json())
        .then((data) => setEvents(data))
        .catch((err) => console.error('Veri cekme hatası !', err));
    }, []); tekillige son verdik */

    useEffect(() => {
        fetchEvents();
    }, []); 


    return (
        <EventContext.Provider value={{ events, setEvents, fetchEvents }}>
            {children}
        </EventContext.Provider>
    );
};
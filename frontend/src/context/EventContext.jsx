import { createContext, useState } from 'react';
import eventsData from "/Users/VICTUS-14/Web_Project/frontend/src/data/events"; // buradan aliyorum mock veriyi

// 1. Context olusturalim ??
export const EventContext = createContext();

// 2. Provider Bileseni
export function EventProvider({ children }) {
    const [events, setEvents] = useState(eventsData); // baslanfic verisi olarak kullaniyoruz. Daha oncesinde mock olarak test amacli olusturmustuk.

    return(
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    );
}
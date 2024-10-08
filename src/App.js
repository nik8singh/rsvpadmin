import './App.css';
import { rsvpApiEndpoint } from "./config";
import { useEffect, useState } from "react";

function App() {

  const [paathData, setPaathData] = useState({
    YesRsvp: [],
    totalYesPeople: 0,
  });

  const [partyData, setPartyData] = useState({
    YesRsvp: [],
    totalYesPeople: 0,
  });

  const [paathDeclined, setPaathDeclined] = useState({
    NoRsvp: [],
  });

  const [partyDeclined, setPartyDeclined] = useState({
    NoRsvp: [],
  });

  useEffect(() => {
    // Fetch Paath RSVP Data
    const fetchPaathRsvp = async () => {
      try {
        const response = await fetch(`${rsvpApiEndpoint}/PaathRsvp`, {
          method: "GET",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin'
        });

        if (response.status !== 200) {
          console.log("Problem: " + response.status);
          return;
        }

        const data = await response.json();
        setPaathData(data.body);
      } catch (err) {
        console.log("Error:-S", err);
      }
    };

    // Fetch Party RSVP Data
    const fetchPartyRsvp = async () => {
      try {
        const response = await fetch(`${rsvpApiEndpoint}/PartyRsvp`, {
          method: "GET",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin'
        });

        if (response.status !== 200) {
          console.log("Problem: " + response.status);
          return;
        }

        const data = await response.json();
        setPartyData(data.body);
      } catch (err) {
        console.log("Error:-S", err);
      }
    };

    // Fetch Party Declined Data
    const fetchPartyDeclined = async () => {
      try {
        const response = await fetch(`${rsvpApiEndpoint}/PartyRsvp/Declined`, {
          method: "GET",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin'
        });

        if (response.status !== 200) {
          console.log("Problem: " + response.status);
          return;
        }

        const data = await response.json();
        setPartyDeclined(data.body);
      } catch (err) {
        console.log("Error:-S", err);
      }
    };

    // Fetch Paath Declined Data
    const fetchPaathDeclined = async () => {
      try {
        const response = await fetch(`${rsvpApiEndpoint}/PaathRsvp/Declined`, {
          method: "GET",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin'
        });

        if (response.status !== 200) {
          console.log("Problem: " + response.status);
          return;
        }

        const data = await response.json();
        setPaathDeclined(data.body);
      } catch (err) {
        console.log("Error:-S", err);
      }
    };

    // Call the fetch functions when the component mounts
    fetchPaathRsvp();
    fetchPartyRsvp();
    fetchPartyDeclined();
    fetchPaathDeclined();

  }, []); // Empty array ensures the effect runs only once after the component mounts

  return (
    <div className="admin-container">
      <h1>RSVP Admin Panel</h1>

      {/* Paath Event Yes RSVP */}
      <div className="event-container green">
        <h2 className="green">Paath Event - 26th Oct</h2>
        <p>
          Total Headcount: <span className="green-highlight">{paathData.totalYesPeople}</span>
        </p>
        <div className="scrollable-container green">
          <h3>RSVP Yes (Paath)</h3>
          <ul>
            {paathData.YesRsvp.map((person, index) => (
              <li className="green" key={index}>
                {person.name} - {person.paathHeadcount} people - {person.email}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Party Event Yes RSVP */}
      <div className="event-container green">
        <h2 className="green">Party Event - 27th Oct</h2>
        <p>
          Total Headcount: <span className="green-highlight">{partyData.totalYesPeople}</span>
        </p>
        <div className="scrollable-container green">
          <h3>RSVP Yes (Party)</h3>
          <ul>
            {partyData.YesRsvp.map((person, index) => (
              <li className="green" key={index}>
                {person.name} - {person.partyHeadcount} people - {person.email}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* No RSVPs */}
      <div className="event-container red">
        <h2 className="red">Declined Invite</h2>

        <div className="scrollable-container red">
          <h3>RSVP No (Party)</h3>
          <ul>
            {partyDeclined.NoRsvp.map((person, index) => (
              <li className="red" key={index}>{person.name}</li>
            ))}
          </ul>
        </div>

        <div className="scrollable-container red">
          <h3>RSVP No (Paath)</h3>
          <ul>
            {paathDeclined.NoRsvp.map((person, index) => (
              <li className="red" key={index}>{person.name}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;

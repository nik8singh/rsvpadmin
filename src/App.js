import './App.css';
import {rsvpApiEndpoint} from "./config";
import {useEffect, useState} from "react";
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

  window.fetch(`${rsvpApiEndpoint}/PaathRsvp`, {
    method: "GET",
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'same-origin'
  }).then(
      function (response) {
        if (response.status !== 200) {
          console.log("Problem: " + response.status)
          return;
        }
        return response.json();
      }).then((data) => {
    setPaathData(data.body);
  })
      .catch((err) => {
        console.log("Error:-S", err);
      });

  window.fetch(`${rsvpApiEndpoint}/PartyRsvp`, {
    method: "GET",
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'same-origin'
  }).then(
      function (response) {
        if (response.status !== 200) {
          console.log("Problem: " + response.status)
          return;
        }
        return response.json();
      }).then((data) => {
    setPartyData(data.body);
  })
      .catch((err) => {
        console.log("Error:-S", err);
      });

    window.fetch(`${rsvpApiEndpoint}/PartyRsvp/Declined`, {
    method: "GET",
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'same-origin'
  }).then(
      function (response) {
        if (response.status !== 200) {
          console.log("Problem: " + response.status)
          return;
        }
        return response.json();
      }).then((data) => {
    setPartyDeclined(data.body);
  })
      .catch((err) => {
        console.log("Error:-S", err);
      });

      window.fetch(`${rsvpApiEndpoint}/PaathRsvp/Declined`, {
    method: "GET",
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'same-origin'
  }).then(
      function (response) {
        if (response.status !== 200) {
          console.log("Problem: " + response.status)
          return;
        }
        return response.json();
      }).then((data) => {
    setPaathDeclined(data.body);
  })
      .catch((err) => {
        console.log("Error:-S", err);
      });

  //     FILTER LIST OF NON-RESPONSIVE USERS

    const [yetToRsvp, setYetToRsvp] = useState([]);

  const staticList = [
    ["Mahika"],
    ["Arshiya"],
    ["Bond", "Seema", "Sukhpal"],
    ["Shivani", "Avinash"],
    ["Ankur Bhardwaj", "Ruchi Joshi", "Sarthak Kaushik"],
    ["Anant", "Esther"],
    ["Ajay", "Avalon"],
    ["Puneet"],
    ["Nidhi", "Faraaz", "Anum"],
    ["Akanksha", "ru ru", "ruru"],
    ["Muskan"],
    ["Saurabh Sharma"],
    ["Jagjot"],
    ["Jashandeep"],
    ["Ujjwal"],
    ["Harry"],
    ["Shikha"],
    ["Romeda"],
    ["Aparna"],
    ["Jaswanth"],
    ["Sahil"],
    ["Saloni", "Ranawat"],
    ["Oza", "Zaheen"],
    ["Harshit"],
    ["Gazal"],
    ["Varuna", "Sushant"],
    ["Shirish"],
    ["Priyanka", "Solanki", "Surender"],
    ["Akshay", "mittal", "Aakansha"],
    ["Mahima", "Nitish"],
    ["Muskaan Bhardwaj", "Amit Bhardwaj"],
    ["Preena", "Gagan Gujral"],
    ["Aman Singh", "Medha"],
    ["Rohit"],
    ["Akshat"],
    ["Aakanksha"],
    ["Gagan"],
    ["Danish", "Kia"],
    ["Sam", "Vivek"],
    ["Vardha", "Shivam"],
    ["Sourabh"],
    ["Pranav"],
    ["Kavita", "Ayush"],
    ["Anshuman"],
    ["Ritika"],
    ["Trisha"],
    ["Akash"],
    ["Jacky"],
  ];

 const filterYetToRsvp = (yesRsvpList, noRsvpList) => {
    const allRsvpNames = [...yesRsvpList.map(person => person.name), ...noRsvpList.map(person => person.name)];

    // Function to check if a name or its variations exist in the RSVP response
    const nameExistsInRsvp = (nameVariations, rsvpNames) => {
      return nameVariations.some(variation =>
        rsvpNames.some(rsvpName => rsvpName.toLowerCase().includes(variation.toLowerCase()))
      );
    };

    const peopleYetToRsvp = staticList.filter(nameVariations =>
      !nameExistsInRsvp(nameVariations, allRsvpNames)
    ).map(nameVariations => nameVariations[0]); // Only keep the first name of each person

    setYetToRsvp(peopleYetToRsvp);
  };

  useEffect(() => {
    // Assuming your fetch logic that fetches the RSVP data:
    const fetchRsvpData = () => {
      const yesRsvp = paathData.YesRsvp.concat(partyData.YesRsvp);
      const noRsvp = paathDeclined.NoRsvp.concat(partyDeclined.NoRsvp);

      filterYetToRsvp(yesRsvp, noRsvp);
    };

    fetchRsvpData();
  }, []);


  return (
      <div className="admin-container">
          <h1>Admin Panel</h1>

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
                              {person.name} - {person.paathHeadcount} people
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
                              {person.name} - {person.partyHeadcount} people
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
          {/* Yet to RSVP Section */}
          <div className="event-container">
              <h2>People Yet to RSVP</h2>
              <div className="scrollable-container">
                  <ul>
                      {yetToRsvp.map((person, index) => (
                          <li key={index}>{person}</li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>


  );
}

export default App;

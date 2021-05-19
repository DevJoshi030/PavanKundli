import React, { useState } from "react";
import getCookie from "../utils/getCookie";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [expDate, setExpDate] = useState("");
  const [expTime, setExpTime] = useState("");
  const [planet, setPlanet] = useState("ketu");

  const [planets, setPlanets] = useState<string[] | null>(null);
  const [timeline, setTimeline] = useState<string[] | null>(null);

  const handleSubmit = async () => {
    const csrftoken = getCookie("csrftoken");

    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        start_date: startDate,
        start_time: startTime,
        exp_date: expDate,
        exp_time: expTime,
        planet: planet,
      }),
    };

    await fetch("/api/get-dasha/", request_options)
      .then((res) => {
        if (res.status === 200) {
          console.log("Done");
          return res.json();
        } else {
          alert("Error : Invalid Data");
        }
      })
      .then((data) => {
        setPlanets(data.planets);
        setTimeline(data.timeline);
      });
  };

  return (
    <>
      <label htmlFor="start" className="form-label">
        Start Date
      </label>
      <input
        id="start"
        type="date"
        value={startDate}
        className="form-control mb-2"
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="st" className="form-label">
        Start Time
      </label>
      <input
        id="st"
        type="time"
        value={startTime}
        className="form-control mb-2"
        onChange={(e) => setStartTime(e.target.value)}
      />

      <label htmlFor="exp" className="form-label">
        Expected Date
      </label>
      <input
        id="exp"
        type="date"
        value={expDate}
        className="form-control mb-2"
        onChange={(e) => setExpDate(e.target.value)}
      />

      <label htmlFor="et" className="form-label">
        Expected Time
      </label>
      <input
        id="et"
        type="time"
        value={expTime}
        className="form-control mb-2"
        onChange={(e) => setExpTime(e.target.value)}
      />

      <label htmlFor="pla" className="form-label">
        Planet
      </label>
      <select
        name="pla"
        id="pla"
        value={planet}
        className="form-select"
        onChange={(e) => setPlanet(e.target.value)}
      >
        <option value="ketu">Ketu</option>
        <option value="shukra">Shukra</option>
        <option value="surya">Surya</option>
        <option value="chandra">Chandra</option>
        <option value="mangal">Mangal</option>
        <option value="rahu">Rahu</option>
        <option value="guru">Guru</option>
        <option value="shani">Shani</option>
        <option value="budh">Budh</option>
      </select>

      <button onClick={handleSubmit} className="btn btn-primary mt-2 mb-2">
        Submit
      </button>

      <div>
        {planets && <h1>Planet Order</h1>}
        <ul>
          {planets &&
            planets.map((planet, index) => (
              <li key={index}>{planet.toLocaleUpperCase()}</li>
            ))}
        </ul>

        {timeline && <h1>Timeline</h1>}
        <ul>
          {timeline &&
            timeline.map((time, index) => (
              <li key={index}>{time.toLocaleUpperCase()}</li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { Items } from "./data/Items";

export default function App() {
  const [items, setItems] = useState(Items);
  const [prev, setPrev] = useState(-1);
  const [points, setPoints] = useState(0);
  const [winner, setWinner] = useState(false);
  const [time, setTime2] = useState({ hours: 0, minutes: 1, seconds: 0 });
  const { hours, minutes, seconds } = time;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  function check(current) {
    if (items[current].id === items[prev].id && items[current].name !== items[prev].name) {
      items[current].state = "correct";
      items[prev].state = "correct";
      setItems([...items]);
      setPrev(-1);
      setPoints(points + 1);
    } 
    else if(items[current].id !== items[prev].id) {
      items[current].state = "wrong";
      items[prev].state = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].state = "";
        items[prev].state = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
    else if(items[current].id === items[prev].id && items[current].name === items[prev].name)
    {
      items[current].state = "";
      items[prev].state = "";
      setItems([...items]);
      setPrev(-1);
    }
  }

  function handleClick(id) {
    if (items[id].state !== "correct") {
      if (prev === -1) {
        items[id].state = "active";
        setItems([...items]);
        setPrev(id);
      } 
      else 
      {
        check(id);
      }
    }
    else if (items[id].state === "correct")
    {
      items[id].state = "";
    }
  }

  useEffect(() => {
    if (points === 6) {
      setWinner(true);
    }

    if (winner === true) {
      document.getElementById("winner").classList.add("show");
    }
  }, [points, winner]);

  const start = () => {
    setPoints(0);
    setWinner(false);
    console.log(winner);
    document.getElementById("winner").classList.remove("show");
    items.forEach((item) => {
      item.state = "";
      setItems([...items]);
    });
    setTime({ hours: 0, minutes: 1, seconds: 0 });
  };

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <>
      <div id="App" className="App">
        <div className="winner" id="winner">
          <h1> You are the winner! </h1>
          <div className="btn" onClick={start}>
            Play again
          </div>
        </div>
        <div className="cards">
          <div>
            <h1> Score:{points} </h1>
            <h1>{`${hrs.toString().padStart(2, "0")}:${mins
              .toString()
              .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</h1>
          </div>
          <div className="container">
            {items.map((item, index) => (
              <Card
                key={index}
                id={index}
                item={item}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { Items } from "./data/Items";
import CounterTimer from "./components/CounterTimer";

export default function App() {
  const [items, setItems] = useState(Items);
  const [prev, setPrev] = useState(-1);
  const [points, setPoints] = useState(0);
  const [winner, setWinner] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 2, seconds: 0 });

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].state = "correct";
      items[prev].state = "correct";
      setItems([...items]);
      setPrev(-1);
      setPoints(points + 1);
    } else {
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
  }

  function handleClick(id) {
    if (items[id].state !== "correct") {
      if (prev === -1) {
        items[id].state = "active";
        setItems([...items]);
        setPrev(id);
      } else {
        check(id);
      }
    }
  }

  useEffect(() => {
    if (points === 6) {
      setWinner(true);
    }

    if (winner === true) 
    {
      document.getElementById("winner").classList.add("show");
    }

  }, [points, winner]);

  const start = () => {
    setPoints(0);
    setWinner(false);
    console.log(winner);
    document.getElementById('winner').classList.remove("show");
    items.forEach(item => {
      item.state = "";
      setItems([...items]);
    })
    setTime({ hours: 0, minutes: 2, seconds: 0 })
  } 

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
            <CounterTimer hourMinsSecs={time} />
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

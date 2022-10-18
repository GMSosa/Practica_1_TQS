import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Items } from "../data/Items";

export default function Cards({score}) {
  const [items, setItems] = useState(Items);
  const [prev, setPrev] = useState(-1);

  function sumar(number) {
    return number + 1;
  }

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].state = "correct";
      items[prev].state = "correct";
      setItems([...items]);
      setPrev(-1);
      score = score + 1;
    } else {
      items[current].state = "wrong";
      items[prev].state = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].state = "";
        items[prev].state = "";
        setItems([...items]);
        setPrev(-1);
      }, 1500);
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

  return (
    <div className="cards">
      <h1> Score: {score} </h1>
      <div className="container">
        {items.map((item, index) => (
          <Card key={index} id={index} item={item} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}
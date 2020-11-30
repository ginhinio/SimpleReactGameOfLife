import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
const gn = require("grid-neighbors-1d");
let time = null;
const Screen = {
  width: "1000px",
  height: "1000px",
  backgroundColor: "gray",
  display: "grid",
  gridTemplateColumns:
    "5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5%",
  gridTemplateRows:
    "5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5% 5%",
  gridRowGap: "1px",
  gridColumnGap: "1px"
};
const Cell = {
  width: "100%",
  height: "100%",
  backgroundColor: "black"
};

export default function App() {
  let arr = [];
  for (let i = 0; i < 400; i++) {
    arr.push({ dead: true });
  }
  const [cells, setCells] = useState(arr);
  const [started, setStarted] = useState(false);
  const getCellState = (index, clls) => {
    let neighs = gn(index, 20, 20);
    let count = 0;
    let dead = true;
    neighs.forEach((val, ii) => {
      if (clls[val].dead === false) count += 1;
    });
    if (count < 2 || count > 3) dead = true;
    if (count === 2 && clls[index].dead === false) dead = false;
    if (count === 3) dead = false;

    return dead;
  };

  useEffect(() => {
    if (!started) clearInterval(time);
    if (started) {
      time = setInterval(() => {
        if (!started) return;

        setCells((oldCells) => {
          let newState = [...oldCells];
          cells.forEach((obj, i) => {
            newState[i] = { dead: getCellState(i, oldCells) };
          });
          return newState;
        });
      }, 1000);
    }

    //if (!started) clearInterval(time);
  }, [started]);
  return (
    <div className="App">
      <div style={Screen}>
        {cells.map((val, i) => {
          return (
            <div
              key={i}
              style={{
                ...Cell,
                ...{ backgroundColor: cells[i].dead ? "black" : "white" }
              }}
              onClick={() => {
                let newState = [...cells];
                newState[i].dead = !newState[i].dead;
                setCells(newState);
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          zIndex: 1000,
          width: 100,
          height: 30,
          bottom: "0px",
          position: "absolute",
          lineHeight: "30px",
          userSelect: "none",
          color: "white",
          backgroundColor: started ? "red" : "green"
        }}
        onClick={() => {
          setStarted(!started);
        }}
      >
        {started ? "stop" : "start"}
      </div>
    </div>
  );
}

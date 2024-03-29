import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Controls = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`/devices/HDQcbGz`).then((response) => {
      const { fan } = response.data;
      setCount(fan);
    });
  }, []);

  function decreaseHandler() {
    setCount(count < 1 ? 0 : count - 1);
    let speed = count - 1;
    axios
      .post("/devices", {
        teamid: "HDQcbGz",
        device: "fan",
        value: speed,
      })
      .then((response) => {
        console.log(response);
      });
  }
  function increaseHandler() {
    setCount(count > 4 ? 5 : count + 1);
    let speed = count + 1;
    axios
      .post("/devices", {
        teamid: "HDQcbGz",
        device: "fan",
        value: speed,
      })
      .then((response) => {
        console.log(response);
      });
  }

  function resetHandler() {
    setCount(0);
    let speed = 0;
    axios
      .post("/devices", {
        teamid: "HDQcbGz",
        device: "fan",
        value: speed,
      })
      .then((response) => {
        console.log(response);
      });
  }

  // Calculate the rotation degree based on the count
  const rotationDegree = count * 20;

  return (
    <div className="flex flex-col border-2 h-[100vh] w-[30%] font-bold text-4xl justify-center items-center space-y-6 rounded-lg">
      <h1>Fan Controls</h1>

      <img
        src="./images/fan.png"
        alt="Fan"
        className="h-40 w-15"
        style={{ animation: "rotateFan" }}
      ></img>
      <div className="bg-white flex  gap-12 py-3 rounded-sm text-[25px] text-[#344151]">
        <button
          onClick={decreaseHandler}
          className="border-r-2 text-center w-20 border-[#bfbfbf]  text-5xl"
        >
          -
        </button>
        <div className="font-bold gap-12 text-5xl"> {count} </div>
        <button
          onClick={increaseHandler}
          className="border-l-2 text-center w-20 border-[#bfbfbf]  text-5xl"
        >
          +
        </button>
      </div>
      <div>
        <button
          onClick={resetHandler}
          className="bg-[#0398d4] text-white px-5 py-2 rounded-sm text-lg"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default Controls;

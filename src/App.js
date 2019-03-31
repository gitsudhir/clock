import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
const App = () => {

  const [date, setDate] = useState(new Date());
  const [sec, setSec] = useState(date.getSeconds())
  useEffect(() => {
    //  angle h = 0.5 *(60*h + m)
    // angle m = 6 * m 
    let interval = setInterval(() => {
      setDate(new Date())
    }, 1000);


    (function start() {
      var hour = document.getElementById("hour")
      hour.setAttribute("transform", "rotate(" + (90 + 0.5 * (60 * (date.getHours() >= 12 ? date.getHours() - 12 : date.getHours()) + date.getMinutes())) + ",200,150)")
      var min = document.getElementById("min")
      min.setAttribute("transform", "rotate(" + (90 + (6 * date.getMinutes())) + ",200,150)")
      var sec = document.getElementById("sec")
      sec.setAttribute("transform", "rotate(" + (6 * date.getSeconds() + 90) + ",200,150)")
    })();
    return () => clearInterval(interval)
  }, [sec, date]);

  return (
    <> 
      <h3>{date.toString()}</h3>
      {/*
      <p>Hour : {date.getHours()}</p>
      <p>minutes : {date.getMinutes()}</p>
      <p>second : {date.getSeconds()}</p>
      <p>angle h:{0.5 * (60 * (date.getHours() >= 12 ? date.getHours() - 12 : date.getHours()) + date.getMinutes())} </p>
      <p>angle min :{6 * date.getMinutes()} </p>
      <p>angle sec :{6 * date.getSeconds()} </p>

      */}
      <svg height="500" width="500" id="clock">
        <circle cx="200" cy="150" r="120" stroke="black" strokeWidth={1 || date.getSeconds()} fill="#fff" />
        <line id="hour" x1="200" y1="150" x2="120" y2="150" transform="rotate(100,200,150)" style={{ fill: 'blue', stroke: 'pink', strokeWidth: '10', opacity: '0.9' }} />
        <line id="min" x1="200" y1="150" x2="88" y2="150" transform="rotate(100,200,150)" style={{ fill: 'blue', stroke: 'red', strokeWidth: '8', opacity: '0.7' }} />
        <line id="sec" x1="200" y1="150" x2="78" y2="150" transform="rotate(100,200,150)" style={{ fill: 'blue', stroke: 'blue', strokeWidth: '5', opacity: '0.5' }} />
        <circle cx="200" cy="150" r="10" strokeWidth={1 || date.getSeconds()} fill="black" />

      </svg>

    </>
  )
}

export default App;
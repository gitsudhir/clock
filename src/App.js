import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
const App = () => {

  const [date, setDate] = useState(new Date());
  const [sec, setSec] = useState(date.getSeconds())
  const [hourDraw, setHourDraw] = useState([]);

  useEffect(() => {
    //  angle h = 0.5 *(60*h + m)
    // angle m = 6 * m 
    let interval = setInterval(() => {
      setDate(new Date())
    }, 1000);


    (function start() {
      var hour = document.getElementById("hour")
      //console.log(hour.getAttribute("x1"));
      let hourAngle = (90 + 0.5 * (60 * (date.getHours() >= 12 ? date.getHours() - 12 : date.getHours()) + date.getMinutes()));

      hour.setAttribute("transform", "rotate(" + hourAngle + ",200,150)")
      var min = document.getElementById("min")

      min.setAttribute("transform", "rotate(" + (90 + (6 * date.getMinutes())) + ",200,150)")
      var sec = document.getElementById("sec")
      sec.setAttribute("transform", "rotate(" + (6 * date.getSeconds() + 90) + ",200,150)")
      var hourList = [];
      for (let i = 1; i <= 12; i++) {
        const xx = (200 + 133 * Math.cos(30 * i * Math.PI / 180));
        const yy = (150 + 133 * Math.sin(30 * i * Math.PI / 180));
        hourList.push({ x: xx, y: yy })
      }
   
    
      // console.log('ga',hourList)
      setHourDraw(hourList);
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
      <svg height="520" width="520" id="clock">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(99, 122, 255)', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        <circle cx="200" cy="150" r="120" stroke="black" strokeWidth={1 || date.getSeconds()} fill="url(#grad1)" />
        <circle cx="200" cy="150" r="150" stroke="black" strokeWidth={2} fill="url(#grad1)" />
        <line id="hour" x1="200" y1="150" x2="120" y2="150" transform="rotate(100,200,150)" style={{ fill: 'blue', stroke: 'pink', strokeWidth: '10', opacity: '0.9' }} />
        <line id="min" x1="200" y1="150" x2="88" y2="150" transform="rotate(100,200,150)" style={{ fill: 'blue', stroke: 'red', strokeWidth: '8', opacity: '0.7' }} />
        <line id="sec" x1="200" y1="150" x2="78" y2="150" transform="rotate(100,200,150)" style={{ fill: 'blue', stroke: 'blue', strokeWidth: '5', opacity: '0.5' }} />
        <circle cx="200" cy="150" r="10" strokeWidth={1 || date.getSeconds()} fill="black" />
        {
          hourDraw.map(({ x, y }, i) => (
            <Text x={x} y={y} i={(i == 8 ? i + 4 : (i + 4) % 12)} />
          ))
        }
      </svg>

    </>
  )
}

const Text = (({ x, y, i }) => {
  return <text x={x} y={y} fill="gold">{i}</text>
})

export default App;

import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Peer from 'simple-peer';
import wrtc from 'wrtc';


let messages = []
const update = (message) => {
  messages = messages.concat(message)
}

const App = () => {
  (function () {
    //alert('heloo');
    const p1 = Peer({ trickle: false, initiator: true })
    const p2 = Peer({ trickle: false })

    p1.on('signal'
      , (data) => {
        console.log('p1 signal', data)
        update('signal' + data.toString('utf-8'))
        update(JSON.stringify(data))
        p2.signal(data);
      })
    p1.on('connect'
      , () => {
        console.log('p1 connected##########')
        update('p1 connected');
        p1.send('hi sudhir')
      })
    p1.on('data'
      , (data) => {
        console.log('p1 received', data.toString('utf-8'))
        update(data.toString('utf-8'));
      })
    p1.on('error', (error) => console.error('p1 error', error))
    p1.on('close', () => console.log('p1 connection closed'))

    p2.on('signal'
      , (data) => {
        console.log('p2 signal', data)
        update('p2 signal' + data.toString('utf-8'))
        p1.signal(data);
      })
    p2.on('connect'
      , () => {
        console.log('p2 connected')
        p2.send('Fine, thanks. How about you p1 kumar?')

      }
    )
    p2.on('data'
      , (data) => {
        console.log('p2 received', data.toString('utf-8'))
        update(data.toString('utf-8'))
      })
    p2.on('error', (error) => console.error('p2 error', error))
    p2.on('close', () => console.log('p2 connection closed'))



  })();

  const [on, setOn] = useState(false);

  return (
    <div className='App'>
      <button onClick={() => setOn(!on)}>show message</button>
      {on ? <input value={messages} /> : <h4>nothing</h4>}
    </div>

  );

}

export default App;

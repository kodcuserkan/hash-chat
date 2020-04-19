import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {

    const [ room, setRoom ] = useState('');
    const [ name, setName ] = useState('');

    // console.log(name , room);

    return (

        <div className="joinOuter">
            <div className="joinInner">
                <h1>Bir odaya katılın</h1>
                
                <div><input className="joinInput" placeholder="Nickiniz" type="text" onChange={(e) => setName(e.target.value)}  /></div>
                <div><input className="joinInput mt-20" placeholder="Odanız" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
                <Link onClick={e => (!room || !name) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">GİRİŞ</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;

const Chat = ({ location }) => {

    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const ENDPOINT = 'https://hash-chat.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        // console.log(name,room);
        setName(name);
        setRoom(room);

        socket.emit('join', { room, name }, () => {
            
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search]); // Use effecte 2 defa render edilmesin diye 2inci argumenti bu şekilde verdik, Eğer bu argumenttekiler değişmezse render yapma dedik (Serveri yormamak ve gereksiz render yapmamak için)

    useEffect(()=> {
        socket.on('message', message => {
            setMessages(msgs => [...msgs, message]);
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        
        // console.log("event.key" , event.key , "message: ",message);

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    // console.log(message , messages);

    return (

        <div className="outerContainer">
           <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
           </div>
           <TextContainer users={users}/>
           </div>
    )
}

export default Chat;
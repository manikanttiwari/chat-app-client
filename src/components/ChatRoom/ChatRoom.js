import React, { useState, useEffect } from 'react'

import './ChatRoom.css'
import io from "socket.io-client";

import { getMessages } from '../../services/services'

const END_NODE = 'http://localhost:5000'
const socket = io(END_NODE);
// let req_count = 0
const ChatRoom = React.memo(({ history }) => {
    const [name, setName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let messagesEndRef = React.createRef()
    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let name = urlParams.get("name")
        let roomCode = urlParams.get("room_code")
        setName(name);
        setRoomCode(roomCode)
        async function getMsgs() {
            let payload = {
                room_code: roomCode
            }
            // console.log(payload)
            let response = await getMessages(payload)
            // console.log(response)
            if (response.success === true) {
                setMessages(response.chats)
            }
        }

        socket.emit('join', { name, roomCode }, (error) => {
            if (error) {
                history.push('/')
                alert("Error joining the room");
            }
            else {
                getMsgs()
            }
        });

    }, [])

    useEffect(() => {
        socket.on('message', function (message) {
            if (message.type === "entry") {
                let msg = { _id: "", msg: message.text, username: message.user, createdAt: Date.now() }
                setMessages(messages => [...messages, msg]);
                return;
            }
            // let msgs = [...messages, { msg: message.text, username: message.user, createdAt: Date.now() }];
            // console.log(msgs)
            // msgs.push({ msg: message.text, username: message.user, createdAt: Date.now() })
            let msg = { _id: message._id, msg: message.text, username: message.user, createdAt: Date.now() }
            setMessages(messages => [...messages, msg]);
            // setMessages(() => [...messages, ])
        });
    }, []);

    const sendMessage = () => {
        if (message) {
            socket.emit('sendMessage', { message, name, roomCode }, (error) => {
                if (error) return alert('Cannot send this message')
                console.log(messages)
                setMessage('')
            });
        } else {
            alert('Please type something')
        }
    }
    const onChangeValue = (e) => {
        setMessage(e.target.value)
    }
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent" ref={(el) => { messagesEndRef = el; }}>
                {messages.length ? messages.map((item, index) => {
                    if (item.username === name) {
                        return <p key={item._id} className="currentUser">{item.msg}(you)</p>
                    } else {
                        return <p key={item._id} className="otheruser">{item.msg}({item.username})</p>
                    }

                })
                    : <p>Start typing the message</p>}
            </div>
            <input onChange={onChangeValue} value={message} type="text" id="password" className="fade third" name="login" placeholder="Type a message" />
            {/* <button className="sendButton" onClick={sendMessage}>Send</button> */}
            <input autoComplete="off" onClick={sendMessage} type="submit" className="fadeIn fourth" value="Send" />

        </div>
    )
})

export default ChatRoom;

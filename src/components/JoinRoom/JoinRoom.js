import React,{useState} from 'react'

import './JoinRoom.css'

export default function JoinRoom({ history }) {

    const [name, setName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    const navigateToChat = () => {
        if (name === "" || roomCode === "") {
            alert('Please enter the input')
            return;
        }
        history.push(`/chat?name=${name}&room_code=${roomCode}`)
    }

    const onChangeInput = (e, type) => {
        if (type === "name") {
            setName(e.target.value)
        }
        if (type === "room") {
            setRoomCode(e.target.value)
        }
    }
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Chat App </h2>
                <input onChange={(e) => onChangeInput(e, "name")} type="text" id="login" className="fadeIn second" name="login" placeholder="Name" />
                <input onChange={(e) => onChangeInput(e, "room")} type="text" id="password" className="fadeIn third" name="login" placeholder="Room Id" />
                <input onClick={navigateToChat} type="submit" className="fadeIn fourth" value="Join" />
            </div>
        </div>
    )
}

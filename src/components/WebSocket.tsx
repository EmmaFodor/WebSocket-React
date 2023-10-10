import {useContext, useEffect, useState} from "react";
import {WebsocketContext} from "../contexts/WebSocketContext";

type MessagePayload = {
    content: string;
    message: string;
}
export const WebSocket = () => {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(()=>{
        socket.on('connect', ()=>{
            console.log('Connected');
        })
        socket.on('onMessage', (newMessage: MessagePayload) =>{
            console.log('onMessage event');
            console.log(newMessage);
            setMessages((prev)=>[...prev, newMessage]);
        })
        return () => {
            console.log('Unregistering event');
            socket.off('connect');
            socket.off('onMessage');
        };
    }, []);

    const onSubmit = () => {
        socket.emit('newMessage', value);
        setValue('');
    };

    return <div>
        <div>
            <h1>WebSocket Component</h1>
            <div>{messages.length === 0 ? <div>No Messages</div> : <div>
                {messages.map((message)=> <div>
                <p>{message.content}</p>
                </div>)}
            </div>}</div>
            <div>
                <input type="text" value={value} onChange={(e)=> setValue(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    </div>
}
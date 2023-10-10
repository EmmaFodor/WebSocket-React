import React from 'react';
import './App.css';
import {socket, WebSocketProvider} from "./contexts/WebSocketContext";
import {WebSocket} from "./components/WebSocket";

function App() {
  return (
    <WebSocketProvider value={socket}>
      <WebSocket />
    </WebSocketProvider>
  );
}

export default App;

import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chatpage from "./pages/Chatpage"
import ChatProvider from "./context/ChatProvider";

function App() {
  return (
    <div className="App">
    <Router>
      <ChatProvider>
      <Routes>
        <Route path="/" element={<Homepage />} exact/>
        <Route path ="/chat" element={<Chatpage />}/>
      </Routes>
        </ChatProvider>
    </Router>
    </div>
  );

}

export default App;

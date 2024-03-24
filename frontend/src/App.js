
import { Button, ButtonGroup } from '@chakra-ui/react';
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chatpage from "./pages/Chatpage"
import ChatProvider from "./context/ChatProvider";

function App() {
  return (
    <Router>
      <ChatProvider>
      <Routes>
        <Route path="/" component={Homepage} exact/>
        <Route path ="/chat" component={Chatpage}/>
      </Routes>
        
        </ChatProvider>
    </Router>
  );

}

export default App;

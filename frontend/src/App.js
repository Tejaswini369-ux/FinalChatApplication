import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Homepage from "./pages/Homepage";
import {Route} from "react-router-dom";
import Chatpage from "./pages/Chatpage"

function App() {
  return (
  <div className="App">
  <Route path="/" component={Homepage} exact/>
  <Route path ="/chat" component={Chatpage}/>
  </div>
  );

}

export default App;

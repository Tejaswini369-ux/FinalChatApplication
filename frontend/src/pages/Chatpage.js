import React ,{useEffect, useState} from "react";
import axios from "axios";
import SideDrawer from "../components/Authentication/miscellaneous/SideDrawer";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/Authentication/miscellaneous/MyChats";
import ChatBox from "../components/Authentication/miscellaneous/ChatBox";

const Chatpage = () => {
       const {user} =ChatState();
       const [fetchAgain,setFetchAgain]=useState(false);
       return <div style={{width:"100%", overflow:'hidden'}}>
        {user && <SideDrawer/>}
      <Box d="flex">
        {user&&<MyChats fetchAgain={fetchAgain}/>}
      </Box>
      <Box mx='31.4%' my='-42%'>
         {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
       </div>
};

export default Chatpage;
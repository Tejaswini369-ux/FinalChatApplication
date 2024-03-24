import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Authentication/miscellaneous/ProfileModal';
import UpdateGroupChatModal from './Authentication/miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import "./styles.css"
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client"

const ENDPOINT="https://finalchatapplication.onrender.com";
var socket,selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast=useToast();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages=async()=>{
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `https://finalchatapplication.onrender.com/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  useEffect(()=>{
  socket=io(ENDPOINT);
  socket.emit ("setup",user)
  socket.on("connected",()=>{
   setSocketConnected(true)
  })
  socket.on('typing',()=>setIsTyping(true))
  socket.on('stop typing',()=>setIsTyping(false))
},[])

   useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
    selectedChatCompare=selectedChat;
  }, [selectedChat]);

    useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage=async(e)=>{
    if((e).key==="Enter" && newMessage){
      socket.emit('stop typing',selectedChat._id)
   try{
    const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.post(
          "https://finalchatapplication.onrender.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        setNewMessage("");
        socket.emit("new message",data)
        setMessages([...messages, data]);
   }catch(error){
    console.log(error);
      toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
   }
    }
  }

  const typingHandler=(e)=>{
    setNewMessage(e.target.value);
    if(!socketConnected) return;
    if(!typing){
      setTyping(true);
      socket.emit("typing",selectedChat._id)
    }
    let lastTypingTime=new Date().getTime()
    var timerLength=3000
    setTimeout(()=>{
     var timeNow=new Date().getTime()
     var timeDiff = timeNow-lastTypingTime;
      if(timeDiff>=timerLength && typing){
        socket.emit('stop typing',selectedChat._id)
        setTyping(false);
      }
    },timerLength )
  }

  return (
    <>
    {
      selectedChat?(
             <>
             <Text
             fontSize={{ base: "28px", md: "30px" }}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            mb='-80' 
             >
           
             {(!selectedChat.isGroupChat ? (
                <>
                <Text textAlign='left' ml='2'>
                   {getSender(user, selectedChat.users)}
                </Text>
                 
                  <Text alignItems='right' mx='94%'mt='-10'>
                  <ProfileModal 
                    user={getSenderFull(user, selectedChat.users)}
                  />
                  </Text>
                  <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            mt='2'
            p='27.7%'
            bg="#E8E8E8"
            w="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                   <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt='32%'
            >
              {isTyping?<div>Loading...</div>:<></>}
              
            </FormControl>
                </>
              ))}
             </Text>
             <Box
              d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
             >
             {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {isTyping?<div>Loading...</div>:<></>}
              <Input
                variant="filled"
                bg='Background'
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                mt='0%'
                color='black'
              />
            </FormControl>
             </Box>
             </>
      ):(
         <Box d="flex" alignItems="center" justifyContent="center" mb='-80'>
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )
    }
    </>
  );
}

export default SingleChat

import { Box, Button, Tooltip ,Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerBody, Input, DrawerHeader, Toast, useToast, Spinner} from '@chakra-ui/react';
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons';
import React, { useState } from 'react'
import { ChatState } from '../../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import ChatLoading from '../../ChatLoading';
import UserListItem from '../../UserAvatar/UserListItem';
import { getSender } from '../../../config/ChatLogics';
import {Effect} from "react-notification-badge"
import NotificationBadge from 'react-notification-badge'

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {user,setSelectedChat,chats,setChats,notification,setNotification} = ChatState();
  const history=useHistory();
   const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  const toast=useToast();
  const handleSearch=async()=>{
      if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
      try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`https://finalchatapplication.onrender.com/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

   const accessChat = async (userId) => {

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };     
      console.log(config)
      const { data } = await axios.post(`https://finalchatapplication.onrender.com/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
   const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
    <Box
     d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        borderWidth="5px"
        h='70px'
        borderRadius='5px'
        padding='5px 0px 5px 0px'
    >
        <Tooltip label="Search Users to chat" 
        hasArrow
        placeContent="bottom-end"
        >
            <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text d={{base:"none",md:'flex'}} px='2'>
                Search user
            </Text>
            </Button>
        </Tooltip>
           <Text fontSize='2xl' fontFamily='sans-serif' mx="35%" my='-9'>
            Start-A-Word
        </Text>
        <div>
            <Menu>
                <MenuButton p={1} mx='90%' my="0">
                  <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                  />
                    <BellIcon  fontSize='2xl' m={1}/>
                </MenuButton>
                <MenuList pl='2'>
                  {!notification.length && "no new Messages"}
                  {notification.map(notif=>(
                    <MenuItem key={notif._id} onClick={()=>{
                     setSelectedChat(notif.chat)
                     setNotification(notification.filter((n)=>n!==notif))
                    }}>
                      {notif.chat.isGroupChat?`New Message in ${notif.chat.chatName}`:`New Message from ${getSender(user,notif.chat.users)}`}
                    </MenuItem>
                  ))}
                </MenuList>
            </Menu>
            <Menu my='-10'>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} mx='93%' mt='-4%'>
              <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
                </MenuButton>
                <MenuList>
                    <ProfileModal user={user}>
                        <MenuItem fontStyle='oblique'>My Profile</MenuItem>
                    </ProfileModal>
                    
                    <MenuDivider/>
                    <MenuItem fontStyle='oblique' onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
    </Box>
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
         <DrawerBody>
            <Box d='flex' pb={1} >
               <Input
                placeholder="Search by name or email"
                mr={2}
                width='5%px'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button  mt='-70'mx='83%' onClick={handleSearch}>Go</Button>
            </Box>
            {loading?
              <ChatLoading/>
                :(
           searchResult?.map(user=>(
            <UserListItem
            key={user._id}
            user={user}
            handleFunction={()=>accessChat(user._id)}
            />
           ))
            )}
            {loadingChat && <Spinner ml='auto' d='flex'/>}
        </DrawerBody></DrawerContent>
       
    </Drawer>
     </div>
  )
}

export default SideDrawer

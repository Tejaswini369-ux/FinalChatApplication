import React, { useEffect } from 'react'
import {Container,Box,Text,Tab,Tabs,TabList,TabPanel,TabPanels} from "@chakra-ui/react"
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import { useHistory } from "react-router";


const Homepage = () => {
   const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chat");
  }, [history]);

  return (
    <Container maxW='xl' centerContent>
     <Box d="flex"
     justifyContent="center"
     textAlign="center"
     p={3}
     bg={"white"}
     w="90%"
     m="40px 0 15px 0"
     borderRadius='10px'
     borderWidth="1px"
     >
      <Text fontSize='4xl' fontWeight='bold'>Start-A-Word</Text>
     </Box>
     <Box bg="white" w="90%" p={3} borderRadius="5px" borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>  <Login/>  </TabPanel>
    <TabPanel>   <Signup/>      </TabPanel>
  </TabPanels>
</Tabs>
     </Box>
    </Container>
  )
}

export default Homepage

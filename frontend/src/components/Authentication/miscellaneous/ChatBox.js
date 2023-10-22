import { Box } from "@chakra-ui/layout";
import { ChatState } from "../../../context/ChatProvider";
import SingleChat from "../../SingleChat"

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
    
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      textAlign='center'
      bg="white"
      width='184%'
      borderRadius={7}
      paddingBottom='130%'
      >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  );
};

export default Chatbox;
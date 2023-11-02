# FinalChatApplication

To run the frontend
--cd frontend
--npm install
--npm start

To run the backend 
--cd backend
--npm install
--nodemon index

compare with my versions in package.json because some of the functionalities I used are not supported on latest versions
In this I implemented chat application with the following functions
1.Already have an account Login
2.Doesn't have an account Signup
3.After login you can see your profile by clicking on your profile photo on right top and you can logout anytime
4.You can search for the chats on left top by typing their name and clicking Go
5.It will display your chats on My Chats side ,You can create groups by clicking on +Group Chat
6.You can click on any chat and start chatting
7.You can see the profile of the person you are chatting with by clicking eye icon
8.Messages will be delivered in real time, implemented this using socket.io
9.Included Bellicon for notifications ,It will show the no.of notifications you have including group chat 
10.It also displays Loading.. if the opposite person is typing and automatically stops ,when typing stops,in 3sec. 

If you are logging in with another user first have to logout from that user on different tab and after logging in refresh the page and check the profile
It works almost fine but if there are any chances that you are not getting desired result just refresh the page once and check the profile


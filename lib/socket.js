//socket.js single socket.io client instance ...

/*
**What is the file only job ?                
=>
lib/socket.js job = ONLY create and export the socket instance
                  = nothing else  (SRP)
Events are handled in ChatWindow.jsx
Zustand is updated in ChatWindow.jsx
socket.js just provides the connection.

**What data does it need ?
=>
needs socket.io-client package.
also...
NEXT_PUBLIC_SERVER_BASE_URL from .env


**Where does that data comes from ? 
=>  from .env.local

What does it do it with that data? 
Creates a io() instance with the server url ...
Sets withCredentials : true -> sends cookie  
Sets autoConnect : false  -> dont connect immediately 
Returns the same Instance Every Time (SINGLETON - CREATIONAL PATTERN )



what does it give back or emit ?
      Exports getSocket()  that returns the socket instance
      Caller gets the socket instance 
      Caller emit events (ChatWindow does this )
      Caller updates ZUSTAND STORE (ChatWindow does this )
*/

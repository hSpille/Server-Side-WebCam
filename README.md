Server-Side-WebCam
==================

Server-Side-WebCam using Node.js, Socket.io and "Motion" for grabbing frames

ServerSide:

You need to have a Linux Server with Node.js installed. The webcam ist connected to the server - not the client.
Motion will 

1. Install Motion  (http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome)
-- apt-get install motion
2. Install Node dependencies: 
-- npm install
3. Start motion in /tmp/motion (default - if other configure it in server.js)
4. Start Node server with 
-- node server.js




ClientSide:
Just open index.html. 

Remember to change the localhost refs if you want to open it NOT from localhost.

var io = require('socket.io').listen(8080);
var fs = require('fs');
var pic = io.of('/picture');
var folder = '/tmp/motion/';
io.set('log level', 1);
var lastImage = null;
var noImage = false;
var clients = 0;



var sendNewImage = function send(){
console.log('Client requests new Image');
sendImage(lastImage);
}

function sendImage(imgData){
    if(imgData != null){
        pic.volatile.emit('frame', {
        data : lastImage.toString('base64'),
        'clients' : clients
        });
    }
}

function readImageFile(){
files = fs.readdirSync(folder);
var newest  = folder + files[files.length -1]
     fs.readFile(newest, function (err, data) {
                          if (err) {
                            if(!noImage){
                                console.log('No up-to-date image');
                                noImage = true;
                                }
                          } else {
                            lastImage = data;
                            if(noImage){
                                noImage = false;
                                console.log('...continue');
                            }
                          }
                        });
    if(!noImage){
        sendImage(lastImage);
    }
    for(i = 0; i < files.length;i++){
        fs.unlink(folder + files[i]);
    }
}

var save_image = function save_image(){
  var name = uuid();
  require('fs').writeFile('/tmp/' + name + '.png', lastImage, function (err) {
    if (err)
      throw err;
    console.log('saved!');
  });
}

//Picture

var moveConnectionHandler = function (socket) {
    sendImage(lastImage);
    

socket.on('sendImage', sendNewImage);
};
pic.on('connection', moveConnectionHandler);

setInterval(function (self) {
        readImageFile();
      }, 50, this);
      
      
io.sockets.on('connection', function (socket) {
    var address = socket.handshake.address;
    console.log("New connection from " + address.address + ":" + address.port);   
    clients++;
socket.on('disconnect', function() { 
    var address = socket.handshake.address;
    console.log("Client disconnected " + address.address + ":" + address.port);
    clients --;
    }
)});

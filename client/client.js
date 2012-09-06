var reloadEvery = 200;
var reload = 0;
$(document).ready(
function () {
var connection = io.connect('http://localhost:8080/picture');
var img = $('#frame');


connection.on('frame', function (frame) {
  if(frame.data.length < 10000)return;
  img.attr('src','data:image/png;base64,' + frame.data);
  var counterspan = $('#counter');
  counterspan.text('Frames: ' + reload);
  reload += 1;
  var clientSpan = $('#clients');
  clientSpan.text('Clients: ' + frame.clients);
});

connection.on('clients',function(clients){
console.log(clients);
var clientspan = $('#clients');
clientspan.text = clients;
}

)});


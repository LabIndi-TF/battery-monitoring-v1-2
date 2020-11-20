var net = require('net');

var server = net.createServer(function(socket) {
	setInterval(function(){
        socket.write('Echo server\r\n');
    },1000);
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');
/*
server.on('data', function(data) {
	console.log('Received from client: ' + data);
	//client.destroy(); // kill client after server's response
});
*/
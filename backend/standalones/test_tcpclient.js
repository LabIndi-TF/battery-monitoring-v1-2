var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
    //client.write('Hello, server! Love, Client.\r\n');
    //client.pipe(client);
});

//client.write('Hello, server! Love, Client.\r\n');

client.on('data', function(data) {
    //console.log('Received from server: ' + data);
    console.log(data);
	//client.destroy(); // kill client after server's response
});
// self.stdin -> a.stdin : down
// a.stdout -> b.stdin : route
// a.stdout -> self.stdout : up
// b.stdout -> self.stdout : up
// a.stderr -> self.stderr : up
// b.stderr -> self.stderr : up


function Down (sender, senderPort, receiver, receiverPort) {
    this.sender = sender;
    this.senderPort = senderPort;
    this.receiver = receiver;
    this.receiverPort = receiverPort;
    this.handle = function (from, port, message) {
	if (from === this.sender && port === this.senderPort) {
	    let newm = new Message (this.receiverPort, message.data);
	    this.receiver.enqueueInput (newm);
	}
    }
}

function 

function Emitter (parent, name) {
    this.parent = parent;
    this.name = name;
    this.inq = new FIFO ();
    this.outq = new FIFO ();
    this.handler = function (message) {
	this.connections.forEach (connection) {
	    connection.handle ('stdin', message);
	}
	while (this.someChildActive ()) {
	    this.step ();
	}
    }
    this.enqueueInput = function (message) {
	this.inq.push (message);
    }
    this.enqueueOutput = function (message) {
	this.outq.push (message);
    }
    this.dequeueInput = function () {
	return this.inq.pop ();
    }
    this.dequeueOutput = function () {
	return this.outq.pop ();
    }
    
}

function Identity (parent, name) {
    this.parent = parent;
    this.name = name;
    this.inq = new FIFO ();
    this.outq = new FIFO ();
    this.handler = function (message) {
	[success, transpiled, errormessage] = transpile (src, grammarName, grammar, fmt);
	if (success) {
	    this.out.push (new Message ('stdout', transpiled));
	} else {
	    this.out.push (new Message ('stderr', errormessage));
	}
    }

e = new Emitter (undefined, 'emitter');
a = new Identity (undefined, 'a');
b = new Identity (undefined, 'b');
e.children = [a, b];
e.connections = [
    new Down (e, 'stdin', a, 'stdin'),
    new Route (a, 'stdout', b, 'stdin'),
    new Up (a, 'stdout', e, 'stdout'),
    new Up (b, 'stdout', e, 'stdout'),
    new Up (a, 'stderr', e, 'stderr'),
    new Up (b, 'stderr', e, 'stderr')
];

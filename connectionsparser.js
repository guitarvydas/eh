/* 
form
{"receivers":[{"receiver":{"component":"cell_7","port":"b"}}],"senders":[{"sender":{"component":".","port":"a"}}]}
{"receivers":[{"receiver":{"component":"cell_8","port":"d"}}],"senders":[{"sender":{"component":"cell_7","port":"c"}}]}
{"receivers":[{"receiver":{"component":".","port":"f"}}],"senders":[{"sender":{"component":"cell_8","port":"e"}}]}
*/

var gSubConnections = gClass + String.raw`
Connections <: xClass {
  Main := Connection*
  SelfReceiver = dq "receivers" dq ":" "[" "{" dq "receiver" dq ":" SelfPair "}" "]"
  SelfSender = dq "senders" dq ":" "[" "{" dq "sender" dq ":" SelfPair "}" "]"
  SelfPair = "{" dq "component" dq ":" dq "." dq "," dq "port" dq ":" PortName "}"

  Connection := 
    | "{" SelfReceiver "," SelfSender "}" -- passThrough
    | "{" Receiver "," SelfSender "}" -- down
    | "{" SelfReceiver "," Sender "}" -- up
    | "{" Receiver "," Sender "}" -- route
}
`;

var fSubConnections =
      fClass
    + String.raw`
fSubConnections {
  Main [Connection*] = ‛⟨Connection⟩’

  Connection [x] = ‛⟨x⟩’
  Connection_passThrough [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.passThrough)⟨rv⟩,’
  Connection_down [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.down)⟨rv⟩,’
  Connection_up [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.up)⟨rv⟩,’
  Connection_route [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.route)⟨rv⟩,’

  SelfReceiver [dq1 kwreceivers dq1 kcolon1 lbracket lbrace dq3 kwreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛SelfReceiver (⟨Pair⟩)’
  SelfSender  [dq1 kwsenders dq2 kcolon1 lbracket lbrace dq3 kwsender dq4 kcolon2 Pair rbrace rbracket] = ‛SelfSender (⟨Pair⟩)’

  SelfPair [lb dq1 kwcomponent dq2 kcolon1 dq1 kdot dq2 kcomma dq3 kwport dq4 kcolon2 PortName rb] = ‛'.','⟨PortName⟩'’

  Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛Receiver (⟨Pair⟩)’
  Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛Sender (⟨Pair⟩)’
  Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛'⟨ComponentName⟩','⟨PortName⟩'’

  
  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`;

function fmtConnections (text) {
    let connections = '';
    let success = true;
    success && ([success, connections, errormessage] = transpile (text, "Connections", gSubConnections, fSubConnections));
    if (success) {
	return 'self._connections = [' + connections + ']';
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}



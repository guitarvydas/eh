/* 
form
{"receivers":[{"receiver":{"component":"cell_7","port":"b"}}],"senders":[{"sender":{"component":".","port":"a"}}]}
{"receivers":[{"receiver":{"component":"cell_8","port":"d"}}],"senders":[{"sender":{"component":"cell_7","port":"c"}}]}
{"receivers":[{"receiver":{"component":".","port":"f"}}],"senders":[{"sender":{"component":"cell_8","port":"e"}}]}
*/

var cl_gSubConnections = gClass + String.raw`
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

var cl_fSubConnections =
      cl_fClass
    + String.raw`
fSubConnections {
  Main [Connection*] = ‛⟨Connection⟩’

  Connection [x] = ‛⟨x⟩’
  Connection_passThrough [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩(make-instance 'pass-through-connect :sender ⟨Sender⟩ :receiver ⟨Receiver⟩)⟨rv⟩,’
  Connection_down [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩(make-instance 'down-connect :sender ⟨Sender⟩ :receiver ⟨Receiver⟩)⟨rv⟩’
  Connection_up [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩(make-instance 'up-connect :sender ⟨Sender⟩ :receiver ⟨Receiver⟩)⟨rv⟩’
  Connection_route [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩(make-instance 'route-connect :sender ⟨Sender⟩ :receiver ⟨Receiver⟩)⟨rv⟩’

  SelfReceiver [dq1 kwreceivers dq1 kcolon1 lbracket lbrace dq3 kwreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'self-receiver :pair ⟨Pair⟩)’
  SelfSender  [dq1 kwsenders dq2 kcolon1 lbracket lbrace dq3 kwsender dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'self-sender :pair ⟨Pair⟩)’

  SelfPair [lb dq1 kwcomponent dq2 kcolon1 dq1 kdot dq2 kcomma dq3 kwport dq4 kcolon2 PortName rb] = ‛self,"⟨PortName⟩"’

  Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'receiver :pair ⟨Pair⟩)’
  Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'sender :pair ⟨Pair⟩)’
  Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛(list ⟨ComponentName⟩ "⟨PortName⟩")’

  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`;

function cl_fmtConnections (text) {
    let connections = '';
    let success = true;
    success && ([success, connections, errormessage] = transpile (text, "Connections", cl_gSubConnections, cl_fSubConnections));
    if (success) {
	return connections;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}


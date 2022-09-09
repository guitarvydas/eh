  const gClass = gIdentityEmitter + String.raw`
xClass <: IdentityEmitter {
}
`;

var selfKind = '<TBD>';

const fClass = String.raw`
xClass {
Components [vs0 lb vs1 Component+ vs2 rb vs3] = ‛
⟨vs0⟩
⟨vs1⟩⟨Component⟩⟨vs2⟩⟨vs3⟩’
Component [SelfDef SelfKind ComponentDef] = ‛⟨ComponentDef⟩’
ComponentDef [lb ComponentJSON rb optcomma] = ‛⟨ComponentJSON⟩’
ComponentJSON [x] = ‛⟨x⟩’
ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛\nclass ⟨selfKind⟩ (Container): (.
⟨NonEmptyChildren⟩
⟨ComponentField⟩
super ().__init__ (parent, name, self._children, self._connections)
.)
’

ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛\nclass ⟨selfKind⟩ (Leaf): (.
super ().__init__ (parent, name, null, null)
.)
’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛⟨ChildList⟩’

ComponentField [CField optcomma?] = ‛⟨CField⟩’

CField_id [dq1 k dq2 kcolon s] = ‛’
CField_inputs [dq1 k dq2 kcolon s] = ‛’
CField_name [dq1 k dq2 kcolon s] = ‛’
CField_kind [dq1 k dq2 kcolon s] = ‛’
CField_outputs [dq1 k dq2 kcolon s] = ‛’
CField_synccode [dq1 k dq2 kcolon s] = ‛’
CField_connections [dq1 k dq2 kcolon ConnectionBody] = ‛⟨ConnectionBody⟩’

ConnectionBody [lb Connection* optcomma* rb] = ‛⟨fmtConnections (Connection)⟩’

Connection [lb Receiver kcomma Sender rb] = ‛\n⟨lb⟩⟨Receiver⟩,⟨Sender⟩⟨rb⟩’
Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛⟨dq1⟩⟨kreceivers⟩⟨dq2⟩⟨kcolon1⟩⟨lbracket⟩⟨lbrace⟩⟨dq3⟩⟨kreceiver⟩⟨dq4⟩⟨kcolon2⟩⟨Pair⟩⟨rbrace⟩⟨rbracket⟩’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛⟨dq1⟩⟨ksenders⟩⟨dq2⟩⟨kcolon1⟩⟨lbracket⟩⟨lbrace⟩⟨dq3⟩⟨ksender⟩⟨dq4⟩⟨kcolon2⟩⟨Pair⟩⟨rbrace⟩⟨rbracket⟩’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛⟨lb⟩⟨kwcomponent⟩⟨kcolon1⟩⟨ComponentName⟩⟨kcomma⟩⟨kwport⟩⟨kcolon2⟩⟨PortName⟩⟨rb⟩’

kwcomponent [dq1 kcomponent dq2] = ‛⟨dq1⟩⟨kcomponent⟩⟨dq2⟩’
kwport [dq1 kport dq2] = ‛⟨dq1⟩⟨kport⟩⟨dq2⟩’
ComponentName_self [q1 s q2] = ‛"⟨s⟩"’
ComponentName_name [s] = ‛"⟨s⟩"’
PortName [s] = ‛"⟨s⟩"’

ChildList [lb Child* rb] = ‛⟨fmtChild (Child)⟩’
kkind [dq1 kkind dq2] = ‛"kind"’
KindName [s] =  ‛"⟨s⟩"’
kname [dq1 kname dq2] = ‛"name"’

StringList [lb vs1 s* optcomma* vs2 rb vs3] = ‛⟨vs1⟩⟨s⟩⟨optcomma⟩⟨vs2⟩⟨vs3⟩’
string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
dq [c] = ‛⟨c⟩’

}
`
+ `
fComponents {
  Components [vs0 lb vs1 Component+ vs2 rb vs3] = ‛⟨vs0⟩⟨vs1⟩⟨Component⟩⟨vs2⟩⟨vs3⟩’
}
fSelfDefs {
  SelfDef [kself keq ComponentName] = ‛.=⟨ComponentName⟩’
  SelfKind [kself keq kind KindName] = ‛.kind=⟨KindName⟩⟨selfKind=KindName,""⟩’
}
`
      + fChild
      + fVerbatim;



// sub-parser for children of form
// {"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}
const childDeclGrammar = verbatimgrammar + String.raw`
ChildDeclarations <: Verbatim {
  Main := Child*
  Child = "{" kkind ":" KindName "," kname ":" ComponentName "}" ","?
kkind = dq "kind" dq
ComponentName = string
KindName = string
kname = dq "name" dq


StringList = "[" vs (string ","?)* vs "]" vs
string (quoted string) = vs dq (~dq any)* dq vs
dq (dquote)= "\""
}
`;

const childDeclFmt = String.raw`
ChildDeclarations {
  Main [x*] = ‛⟨x⟩’
  kkind [dq1 kkind dq2] = ‛⟨dq1⟩⟨kkind⟩⟨dq2⟩’
  KindName [s] =  ‛⟨s⟩’
  kname [dq1 kname dq2] = ‛⟨dq1⟩⟨kname⟩⟨dq2⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛\n⟨lv⟩⟨ComponentName⟩ = ⟨KindName⟩ (self, f'{name}-⟨KindName⟩');⟨rv⟩’
}
` + `
fString {
StringList [lb vs1 s* optcomma* vs2 rb vs3] = ‛⟨lb⟩⟨vs1⟩⟨s⟩⟨optcomma⟩⟨vs2⟩⟨rb⟩⟨vs3⟩’
string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
dq [c] = ‛⟨c⟩’
}
`
      + fVerbatim;

const childListFmt = String.raw`
ChildDeclarations {
  Main [x*] = ‛⟨x⟩’
  kkind [dq1 kkind dq2] = ‛⟨dq1⟩⟨kkind⟩⟨dq2⟩’
  KindName [s] =  ‛⟨s⟩’
  kname [dq1 kname dq2] = ‛⟨dq1⟩⟨kname⟩⟨dq2⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛⟨ComponentName⟩,’
}
`
      + fString
      + fVerbatim;



function fmtChild (text) {
    let instantiations = '';
    let childlist = ''
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildDeclarations", childDeclGrammar, childDeclFmt));
    success && ([success, childlist, errormessage] = transpile (text, "ChildDeclarations", childDeclGrammar, childListFmt));
    if (success) {
	return instantiations + '\nself._children = [' + childlist + ']';
    } else {
	var msg = `??? ${errormessage} ???`;
	console.error (msg);
	return msg;
    }
}




///////// connections

// form
// {"receivers":[{"receiver":{"component":"cell_7","port":"b"}}],"senders":[{"sender":{"component":"cell_6","port":"a"}}]}
// {"receivers":[{"receiver":{"component":"cell_8","port":"d"}}],"senders":[{"sender":{"component":"cell_7","port":"c"}}]}
// {"receivers":[{"receiver":{"component":"cell_6","port":"f"}}],"senders":[{"sender":{"component":"cell_8","port":"e"}}]}

const gConnections = String.raw`
Connections {
  Connections = Connection*
  Connection = 
    | "{" SelfReceiver "," SelfSender "}" -- passThrough
    | "{" Receiver "," SelfSender "}" -- down
    | "{" SelfReceiver "," Sender "}" -- up
    | "{" Receiver "," Sender "}" -- route

  SelfReceiver = kwreceivers ":" "[" "{" kwreceiver ":" SelfPair "}" "]"
  SelfSender = kwsenders ":" "[" "{" kwsender ":" SelfPair "}" "]"
  SelfPair = "{" kwcomponent ":" dq "." dq "," kwport ":" PortName "}"
  Receiver = kwreceivers ":" "[" "{" kwreceiver ":" Pair "}" "]"
  Sender = kwsenders ":" "[" "{" kwsender ":" Pair "}" "]"
  Pair = "{" kwcomponent ":" ComponentName "," kwport ":" PortName "}"


  kwreceivers = dq "receivers" dq
  kwreceiver = dq "receiver" dq
  kwsenders = dq "senders" dq
  kwsender = dq "sender" dq
  kwcomponent = dq "component" dq
  kwport = dq "port" dq
  PortName = nodqstring
  ComponentName = nodqstring

  nodqstring = dq (~dq any)* dq
  string = dq (~dq any)* dq
  dq = "\""
}
`;

const fConnections = String.raw`
Connections {
  Connections [Connection*] = ‛⟨Connection⟩’
  Connection_passThrough [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.passThrough)⟨rv⟩,’
  Connection_down [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.down)⟨rv⟩,’
  Connection_up [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.up)⟨rv⟩,’
  Connection_route [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.route)⟨rv⟩,’


  Receiver [kwreceivers kcolon1 lbracket lbrace kwreceiver kcolon2 Pair rbrace rbracket] = ‛Receiver (⟨Pair⟩)’
  Sender  [kwsenders kcolon1 lbracket lbrace kwsender kcolon2 Pair rbrace rbracket] = ‛Sender (⟨Pair⟩)’
  SelfReceiver [kwreceivers kcolon1 lbracket lbrace kwreceiver kcolon2 Pair rbrace rbracket] = ‛Receiver (⟨Pair⟩)’
  SelfSender  [kwsenders kcolon1 lbracket lbrace kwsender kcolon2 Pair rbrace rbracket] = ‛Sender (⟨Pair⟩)’


  kwreceivers [a b c] = ‛’
  kwreceiver [a b c] = ‛’
  kwsenders [a b c] = ‛’
  kwsender [a b c] = ‛’
  kwcomponent [a b c] = ‛’
  kwport [a b c] = ‛’

  Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛⟨lb⟩⟨kwcomponent⟩⟨kcolon1⟩⟨ComponentName⟩⟨kcomma⟩⟨kwport⟩⟨kcolon2⟩⟨PortName⟩⟨rb⟩’

  PortName [nodqstring] = ‛⟨nodqstring⟩’
  ComponentName [nodqstring] = ‛⟨nodqstring⟩’

  nodqstring [dq1 any* dq2] = ‛⟨any⟩’
  string [dq1 any* dq2] = ‛⟨dq1⟩⟨any⟩⟨dq2⟩’
  dq [q] = ‛⟨q⟩’
}
`;

 //    Connection = ":" kreceivers ":" "[" Rec
 // "{" kreceivers ":" "[" "{" kreceiver ":" "{" kcomponent ":" ComponentName "," kport ":" PortName    

// -------- grammar 
// Connection := 
//   | "{" SelfReceiver "," SelfSender "}" -- passThrough
//   | "{" Receiver "," SelfSender "}" -- down
//   | "{" SelfReceiver "," Sender "}" -- up
//   | "{" Receiver "," Sender "}" -- route
// }

// -------- fmt

// ConnectionBody [lb Connection* optcomma* rb] = ‛⟨Connection⟩’

function fmtConnections (s) {
    let instantiations = '';
    let transpiled = ''
    let success = true;
    success && ([success, transpiled, errormessage] = transpile (s, "Connections", gConnections, fConnections));
    if (success) {
	return `\nself._connections = [(.${transpiled}.)\n]`;
    } else {
	var msg = `??? ${errormessage} ???`;
	console.error (msg);
	return msg;
    }
}

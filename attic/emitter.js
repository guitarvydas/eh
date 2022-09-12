  const gEmitter = gImportsEmitter + String.raw`
Emitter <: StockImports {
SelfReceiver = dq "receivers" dq ":" "[" "{" dq "receiver" dq ":" SelfPair "}" "]"
SelfSender = dq "senders" dq ":" "[" "{" dq "sender" dq ":" SelfPair "}" "]"
SelfPair = "{" kwcomponent ":" dq "." dq "," kwport ":" PortName "}"
Connection := 
  | "{" SelfReceiver "," SelfSender "}" -- passThrough
  | "{" Receiver "," SelfSender "}" -- down
  | "{" SelfReceiver "," Sender "}" -- up
  | "{" Receiver "," Sender "}" -- route
}
`;

const fEmitter = String.raw`
Emitter {
Components [vs0 lb vs1 Component+ vs2 rb vs3] = ‛EMITTER:
\n⟨vs0⟩⟨lb⟩⟨vs1⟩⟨Component⟩⟨vs2⟩⟨rb⟩⟨vs3⟩⟨selfid2reset ()⟩’
Component [lb ComponentJSON rb optComma?] = ‛\n⟨lb⟩⟨ComponentJSON⟩⟨rb⟩⟨optComma⟩’
ComponentJSON [x] = ‛⟨x⟩’
ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛⟨lb⟩⟨NonEmptyChildren⟩⟨ComponentField⟩⟨rb⟩’
ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛⟨lb⟩⟨EmptyChildren⟩⟨ComponentField⟩⟨rb⟩’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛\n’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n⟨dq1⟩⟨kchildren⟩⟨dq2⟩⟨kcolon⟩⟨ChildList⟩⟨optcomma⟩’

ComponentField [CField optcomma?] = ‛\n⟨CField⟩’

CField_id [dq1 k dq2 kcolon s] = ‛⟨panic ("phase2 id")⟩’
CField_inputs [dq1 k dq2 kcolon s] = ‛’
CField_name [dq1 k dq2 kcolon s] = ‛’
CField_kind [dq1 k dq2 kcolon s] = ‛⟨dq1⟩⟨k⟩⟨dq2⟩⟨kcolon⟩⟨s⟩’
CField_outputs [dq1 k dq2 kcolon s] = ‛’
CField_synccode [dq1 k dq2 kcolon s] = ‛’
CField_connections [dq1 k dq2 kcolon ConnectionBody] = ‛⟨ConnectionBody⟩’

ConnectionBody [lb Connection* optcomma* rb] = ‛⟨Connection⟩’

Connection_passThrough [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.passThrough)⟨rv⟩’
Connection_down [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.down)⟨rv⟩’
Connection_up [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.up)⟨rv⟩’
Connection_route [lb Receiver kcomma Sender rb] = ‛\n⟨lv⟩Connect (⟨Sender⟩, ⟨Receiver⟩, self.route)⟨rv⟩’

Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛Receiver (⟨Pair⟩)’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛Sender (⟨Pair⟩)’
SelfReceiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛Receiver (⟨Pair⟩)’
SelfSender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛Sender (⟨Pair⟩)’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛⟨lb⟩⟨kwcomponent⟩⟨kcolon1⟩⟨ComponentName⟩⟨kcomma⟩⟨kwport⟩⟨kcolon2⟩⟨PortName⟩⟨rb⟩’
SelfPair [lb kwcomponent kcolon1 q1 ComponentName q2 kcomma kwport kcolon2 PortName rb] = ‛⟨lb⟩⟨q1⟩⟨kwcomponent⟩⟨q2⟩⟨kcolon1⟩⟨ComponentName⟩⟨kcomma⟩⟨kwport⟩⟨kcolon2⟩⟨PortName⟩⟨rb⟩’

kwcomponent [dq1 kcomponent dq2] = ‛⟨dq1⟩⟨kcomponent⟩⟨dq2⟩’
kwport [dq1 kport dq2] = ‛⟨dq1⟩⟨kport⟩⟨dq2⟩’
ComponentName [s] = ‛⟨stripQuotes (s)⟩’
PortName [s] = ‛⟨s⟩’

ChildList [lb Child* rb] = ‛[⟨Child⟩]’
Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛\n⟨lv⟩⟨ComponentName⟩ = ⟨KindName⟩ (self, f'{name}-⟨KindName⟩')⟨rv⟩ ⟨ComponentName⟩, ’
kkind [dq1 kkind dq2] = ‛⟨kkind⟩’
KindName [s] =  ‛⟨stripQuotes (s)⟩’
kname [dq1 kname dq2] = ‛⟨dq1⟩⟨kname⟩⟨dq2⟩’

}
`
      + fString
      + fVerbatim;
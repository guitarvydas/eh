  const gChildren = gIdentityEmitter + String.raw`
Children <: IdentityEmitter {
}
`;

var selfKind = '<TBD>';

const fChildren =
      fVerbatim
      + String.raw`
Children {
Components [vs0 lb vs1 Component+ vs2 rb vs3] = ‛
⟨vs0⟩
⟨vs1⟩⟨Component⟩⟨vs2⟩⟨vs3⟩’
Component [SelfDef SelfKind ComponentDef] = ‛⟨ComponentDef⟩’
ComponentDef [lb ComponentJSON rb optcomma] = ‛⟨ComponentJSON⟩’
ComponentJSON [x] = ‛⟨x⟩’
ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛
⟨NonEmptyChildren⟩
’

ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛⟨ChildList⟩’

ComponentField [CField optcomma?] = ‛’

CField_id [dq1 k dq2 kcolon s] = ‛’
CField_inputs [dq1 k dq2 kcolon s] = ‛’
CField_name [dq1 k dq2 kcolon s] = ‛’
CField_kind [dq1 k dq2 kcolon s] = ‛’
CField_outputs [dq1 k dq2 kcolon s] = ‛’
CField_synccode [dq1 k dq2 kcolon s] = ‛’
CField_connections [dq1 k dq2 kcolon ConnectionBody] = ‛’

ConnectionBody [lb Connection* optcomma* rb] = ‛’

Connection [lb Receiver kcomma Sender rb] = ‛’

Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛’

kwcomponent [dq1 kcomponent dq2] = ‛’
kwport [dq1 kport dq2] = ‛’
ComponentName_self [q1 s q2] = ‛⟨s⟩’
ComponentName_name [s] = ‛⟨s⟩’
PortName [s] = ‛’

ChildList [lb Child* rb] = ‛⟨Child⟩’
kkind [dq1 kkind dq2] = ‛’
KindName [s] =  ‛⟨s⟩’
kname [dq1 kname dq2] = ‛’

StringList [lb vs1 s* optcomma* vs2 rb vs3] = ‛⟨vs1⟩⟨s⟩⟨optcomma⟩⟨vs2⟩⟨vs3⟩’
string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
dq [c] = ‛⟨c⟩’

}
`
//      + fComponents
//      + fInsert
// + `
// fComponents {
//   Components [vs0 lb vs1 Component+ vs2 rb vs3] = ‛⟨vs0⟩⟨vs1⟩⟨Component⟩⟨vs2⟩⟨vs3⟩’
// }
+ `
fChild {
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛\n⟨lv⟩⟨ComponentName⟩ = ⟨KindName⟩ (self, f'{name}-⟨KindName⟩')⟨rv⟩ ⟨ComponentName⟩, ’
}
`
;
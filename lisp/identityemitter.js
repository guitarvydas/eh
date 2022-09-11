  const gIdentityEmitter = dasgrammar + String.raw`
IdentityEmitter <: DaS {
  Component := SelfDef SelfKind ComponentDef
  SelfDef = "." "=" ComponentName
  SelfKind = "." "kind" "=" ComponentName
  ComponentDef = vs "[" vs ComponentJSON vs "]" vs ","?
  ComponentName := 
    | dq "." dq -- self
    | string    -- name
}
`;

const fIdentityEmitter =
        fComponents
      + fInsert
      + fString
      + fVerbatim
      + String.raw`
IdentityEmitter {
Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛⟨vs1⟩⟨lb⟩⟨vs2⟩⟨Component⟩⟨vs3⟩⟨rb⟩⟨vs4⟩⟨resetselfkind ()⟩’
SelfKind [kdot kkind keq ComponentName] = ‛⟨setselfkind (ComponentName)⟩’
Component [SelfDef SelfKind ComponentDef] = ‛\n⟨SelfDef⟩\n⟨SelfKind⟩\n⟨ComponentDef⟩’
ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛⟨vs1⟩⟨lb⟩⟨vs2⟩⟨ComponentJSON⟩⟨vs3⟩⟨rb⟩⟨vs4⟩⟨optcomma⟩’
ComponentJSON [x] = ‛⟨x⟩’
ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛⟨lb⟩⟨NonEmptyChildren⟩⟨ComponentField⟩⟨rb⟩’
ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛⟨lb⟩⟨EmptyChildren⟩⟨ComponentField⟩⟨rb⟩’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛\n⟨dq1⟩⟨kchildren⟩⟨dq2⟩⟨kcolon⟩⟨lb⟩⟨rb⟩⟨optcomma⟩’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n⟨dq1⟩⟨kchildren⟩⟨dq2⟩⟨kcolon⟩⟨ChildList⟩⟨optcomma⟩’

ComponentField [CField optcomma?] = ‛\n⟨CField⟩’

CField_id [dq1 k dq2 kcolon s] = ‛⟨panic ("phase2 id")⟩’
CField_inputs [dq1 k dq2 kcolon s] = ‛’
CField_name [dq1 k dq2 kcolon s] = ‛’
CField_kind [dq1 k dq2 kcolon s] = ‛’
CField_outputs [dq1 k dq2 kcolon s] = ‛’
CField_synccode [dq1 k dq2 kcolon s] = ‛’
CField_connections [dq1 k dq2 kcolon ConnectionBody] = ‛⟨dq1⟩⟨k⟩⟨dq2⟩⟨kcolon⟩[⟨ConnectionBody⟩]’

ConnectionBody [lb Connection* optcomma* rb] = ‛⟨Connection⟩’

Connection [lb Receiver kcomma Sender rb] = ‛ ⟨lb⟩⟨Receiver⟩,⟨Sender⟩⟨rb⟩’

Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛⟨dq1⟩⟨kreceivers⟩⟨dq2⟩⟨kcolon1⟩⟨lbracket⟩⟨lbrace⟩⟨dq3⟩⟨kreceiver⟩⟨dq4⟩⟨kcolon2⟩⟨Pair⟩⟨rbrace⟩⟨rbracket⟩’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛⟨dq1⟩⟨ksenders⟩⟨dq2⟩⟨kcolon1⟩⟨lbracket⟩⟨lbrace⟩⟨dq3⟩⟨ksender⟩⟨dq4⟩⟨kcolon2⟩⟨Pair⟩⟨rbrace⟩⟨rbracket⟩’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛⟨lb⟩⟨kwcomponent⟩⟨kcolon1⟩⟨ComponentName⟩⟨kcomma⟩⟨kwport⟩⟨kcolon2⟩⟨PortName⟩⟨rb⟩’

kwcomponent [dq1 kcomponent dq2] = ‛⟨dq1⟩⟨kcomponent⟩⟨dq2⟩’
kwport [dq1 kport dq2] = ‛⟨dq1⟩⟨kport⟩⟨dq2⟩’
ComponentName_self [q1 s q2] = ‛⟨q1⟩⟨s⟩⟨q2⟩’
ComponentName_name [s] = ‛⟨s⟩’
PortName [s] = ‛⟨s⟩’

ChildList [lb Child* rb] = ‛⟨lb⟩⟨Child⟩⟨rb⟩’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma] = ‛⟨lb⟩⟨kkind⟩⟨kcolon1⟩⟨KindName⟩⟨kcomma⟩⟨kname⟩⟨kcolon2⟩⟨ComponentName⟩⟨rb⟩⟨optComma⟩’
kkind [dq1 kkind dq2] = ‛⟨dq1⟩⟨kkind⟩⟨dq2⟩’
KindName [s] =  ‛⟨s⟩’
kname [dq1 kname dq2] = ‛⟨dq1⟩⟨kname⟩⟨dq2⟩’
}

`
;

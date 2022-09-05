  const dasgrammar2 = dasgrammar + String.raw`
DaSphase2 <: DaS {
Component := SelfDef ComponentDef
SelfDef = "." "=" ComponentName
ComponentDef = "[" ComponentJSON "]" ","?
}
`;

const dasfmt2 = String.raw`
DaSphase2 {
Components [lb Component+ rb] = ‛⟨lb⟩⟨Component⟩⟨rb⟩⟨selfid2reset ()⟩’
Component [SelfDef ComponentDef] = ‛\n⟨SelfDef⟩⟨ComponentDef⟩’
SelfDef [kself keq ComponentName] = ‛⟨setSelfid2 (ComponentName)⟩’
ComponentDef [lb ComponentJSON rb optcomma] = ‛⟨lb⟩⟨ComponentJSON⟩⟨rb⟩⟨optcomma⟩’
ComponentJSON [x] = ‛⟨x⟩’
ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛⟨lb⟩⟨NonEmptyChildren⟩⟨ComponentField⟩⟨rb⟩’
ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛⟨lb⟩⟨EmptyChildren⟩⟨ComponentField⟩⟨rb⟩’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛\n⟨dq1⟩⟨kchildren⟩⟨dq2⟩⟨kcolon⟩⟨lb⟩⟨rb⟩⟨optcomma⟩’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n⟨dq1⟩⟨kchildren⟩⟨dq2⟩⟨kcolon⟩⟨ChildList⟩⟨optcomma⟩’

ComponentField [CField optcomma?] = ‛\n⟨CField⟩’

CField_id [dq1 k dq2 kcolon s] = ‛⟨selfid = s, ""⟩’
CField_inputs [dq1 k dq2 kcolon s] = ‛’
CField_name [dq1 k dq2 kcolon s] = ‛’
CField_kind [dq1 k dq2 kcolon s] = ‛⟨dq1⟩⟨k⟩⟨dq2⟩⟨kcolon⟩⟨s⟩’
CField_outputs [dq1 k dq2 kcolon s] = ‛’
CField_synccode [dq1 k dq2 kcolon s] = ‛’
CField_connections [dq1 k dq2 kcolon ConnectionBody] = ‛⟨dq1⟩⟨k⟩⟨dq2⟩⟨kcolon⟩⟨ConnectionBody⟩’

ConnectionBody [lb Connection* optcomma* rb] = ‛⟨lb⟩⟨Connection⟩⟨rb⟩’

Connection [lb Receiver kcomma Sender rb] = ‛ ⟨lb⟩⟨Receiver⟩,⟨Sender⟩⟨rb⟩’
Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛⟨dq1⟩⟨kreceivers⟩⟨dq2⟩⟨kcolon1⟩⟨lbracket⟩⟨lbrace⟩⟨dq3⟩⟨kreceiver⟩⟨dq4⟩⟨kcolon2⟩⟨Pair⟩⟨rbrace⟩⟨rbracket⟩’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛⟨dq1⟩⟨ksenders⟩⟨dq2⟩⟨kcolon1⟩⟨lbracket⟩⟨lbrace⟩⟨dq3⟩⟨ksender⟩⟨dq4⟩⟨kcolon2⟩⟨Pair⟩⟨rbrace⟩⟨rbracket⟩’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛⟨lb⟩⟨kwcomponent⟩⟨kcolon1⟩⟨maybeMapSelf (ComponentName)⟩⟨kcomma⟩⟨kwport⟩⟨kcolon2⟩⟨PortName⟩⟨rb⟩’
kwcomponent [dq1 kcomponent dq2] = ‛⟨dq1⟩⟨kcomponent⟩⟨dq2⟩’
kwport [dq1 kport dq2] = ‛⟨dq1⟩⟨kport⟩⟨dq2⟩’
ComponentName [s] = ‛⟨s⟩’
PortName [s] = ‛⟨s⟩’

ChildList [lb Child* rb] = ‛⟨lb⟩⟨Child⟩⟨rb⟩’
Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛⟨lb⟩⟨kkind⟩⟨kcolon⟩⟨KindName⟩⟨kcomma⟩⟨kname⟩⟨kcolon⟩⟨ComponentName⟩⟨rb⟩⟨optcomma⟩’
kkind [dq1 kkind dq2] = ‛⟨dq1⟩⟨kkind⟩⟨dq2⟩’
KindName [s] =  ‛⟨s⟩’
kname [dq1 kname dq2] = ‛⟨dq1⟩⟨kname⟩⟨dq2⟩’

}
` 
      + fString;
      + fVerbatim;

  const gChildImports = gIdentityEmitter + String.raw`
ChildImports <: IdentityEmitter {
}
`;

const fChildImports =
        fIdentityEmitter
      + String.raw`
`
+ `
fOverride {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛⟨vs1⟩⟨vs2⟩⟨Component⟩⟨vs3⟩⟨vs4⟩’
  Component [SelfDef SelfKind ComponentDef] = ‛\n⟨ComponentDef⟩’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n⟨vs1⟩⟨vs2⟩⟨ComponentJSON⟩⟨vs3⟩⟨vs4⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛\n⟨lv⟩from ⟨KindName⟩ import ⟨KindName⟩⟨rv⟩’
  ComponentJSON [x] = ‛⟨x⟩’
  ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛⟨NonEmptyChildren⟩’
  ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛⟨ChildList⟩’
  ChildList [lb Child* rb] = ‛⟨Child⟩’
  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`
;

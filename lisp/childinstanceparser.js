var gSubChildInstantiate = gClass + String.raw`
ChildInstantiate <: xClass {
  Main := Child+
}
`;

var fSubChildInstantiate =
      fClass
    + String.raw`
fSubChildInstantiate {
  Main [child+] = ‛⟨child⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛\n⟨lv⟩⟨ComponentName⟩ = ⟨KindName⟩ (self, f'{name}-⟨KindName⟩');⟨rv⟩’
  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`;

function fmtChildInstances (text) {
    let instantiations = '';
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildInstantiate", gSubChildInstantiate, fSubChildInstantiate));
    if (success) {
	return instantiations;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}

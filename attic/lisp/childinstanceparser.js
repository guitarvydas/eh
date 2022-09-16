var cl_gSubChildInstantiate = cl_gClass + String.raw`
ChildInstantiate <: xClass {
  Main := Child+
  Child := "{" kkind ":" KindName "," kname ":" ComponentName "}" ","? vs Child?
}
`;

var cl_fSubChildInstantiate =
      fClass
    + String.raw`
fSubChildInstantiate {
  Main [child+] = ‛⟨child⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? vs more?] = ‛\n⟨lv⟩(let ((⟨ComponentName⟩ = ⟨KindName⟩ (self, f'{name}-⟨KindName⟩');⟨rv⟩)⟨vs⟩\n⟨more⟩)’
  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`;

function cl_fmtChildInstances (text) {
    console.log (text);
    let instantiations = '';
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildInstantiate", cl_gSubChildInstantiate, cl_fSubChildInstantiate));
    if (success) {
	return instantiations;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}


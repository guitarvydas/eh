var cl_gSubChildList = gClass + String.raw`
ChildList <: xClass {
  Main := Child+
}
`;

var cl_fSubChildList =
      fClass
    + String.raw`
fSubChildList {
  Main [child+] = ‛⟨child⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛⟨lv⟩⟨ComponentName⟩,⟨rv⟩’
  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`;

function cl_fmtChildList (text) {
    let instantiations = '';
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildList", cl_gSubChildList, cl_fSubChildList));
    if (success) {
	return instantiations;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}



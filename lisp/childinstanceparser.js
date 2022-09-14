var cl_gSubChildInstantiate = gClass + String.raw`
ChildInstantiate <: xClass {
  Main := Child+
}
`;

var cl_fSubChildInstantiate =
      fClass
    + fIdentityIgnore
    + String.raw`
fSubChildInstantiate {
  Main [child+] = ‛⟨child⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛\n⟨lv⟩(let ((⟨ComponentName⟩ (make-instance '⟨KindName⟩ :parent self :name (format nil "~a-~a" name "⟨KindName⟩"))))⟨rv⟩\n⟨more⟩)’
  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`;

function cl_fmtChildInstances (text) {
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


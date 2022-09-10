  var gClass = gIdentityEmitter + String.raw`
xClass <: IdentityEmitter {
}
`;

var selfKind = ['<TBD>'];

var fClass =
      fIdentityEmitter;
+ `
fTest {
Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛ZZZ⟨vs1⟩⟨lb⟩⟨vs2⟩⟨Component⟩⟨vs3⟩⟨rb⟩⟨vs4⟩’
}
`;

/*fClass {
  Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma] = ‛A*⟨lb⟩⟨kkind⟩⟨kcolon1⟩⟨KindName⟩⟨kcomma⟩⟨kname⟩⟨kcolon2⟩⟨ComponentName⟩⟨rb⟩⟨optComma⟩a*’
}
*/

/* Child formatter
   parses: {"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}
   used twice:
   1. parse child string and return
      cell_7 = Hello (...)
      cell_8 = World (...)

   2. parse child string and return
      self.children = [cell_7, cell_8]
*/

var gSubChildInstantiate = gClass + String.raw`
ChildInstantiate <: xClass {
}
`;

var fSubChildInstantiate = fClass + String.raw`
fSubChildInstantiate {
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛\n⟨lv⟩⟨ComponentName⟩ = ⟨KindName⟩ (self, f'{name}-⟨KindName⟩');⟨rv⟩’
}
`;


function fmtChildInstances (text) {
    let instantiations = '';
    let childlist = ''
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildInstantiate", gSubChildInstantiate, fSubChildInstantiate));
    if (success) {
	return instantiations + '\nself._children = [' + childlist + ']';
    } else {
	var msg = `??? ${errormessage} ???`;
	console.error (msg);
	return msg;
    }
}

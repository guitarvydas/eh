  var gClass = gIdentityEmitter + String.raw`
xClass <: IdentityEmitter {
}
`;

var selfKind = ['<TBD>'];

var fClass =
    fIdentityEmitter
+ String.raw`
override {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛⟨vs1⟩⟨vs2⟩⟨Component⟩⟨vs3⟩⟨vs4⟩’
  Component [SelfDef SelfKind ComponentDef] = ‛\n⟨ComponentDef⟩’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n⟨vs1⟩⟨vs2⟩⟨ComponentJSON⟩⟨vs3⟩⟨vs4⟩’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma] = ‛⟨lb⟩⟨kkind⟩⟨kcolon1⟩⟨KindName⟩⟨kcomma⟩⟨kname⟩⟨kcolon2⟩⟨ComponentName⟩⟨rb⟩⟨optComma⟩’
  ComponentJSON [x] = ‛⟨x⟩’
  ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛⟨NonEmptyChildren⟩’
  ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛⟨ChildList⟩’
  ChildList [lb Child* rb] = ‛⟨fmtChild (Child)⟩’
}
`;



/* Child formatter
   parses: {"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}
   used twice:
   1. parse child string and return
      cell_7 = Hello (...)
      cell_8 = World (...)

   2. parse child string and return
      self.children = [cell_7, cell_8]
*/


// 1.
var gSubChildInstantiate = gClass + String.raw`
ChildInstantiate <: xClass {
  Main := Child "," Child
}
`;

var fSubChildInstantiate =
      fClass
    + String.raw`
fSubChildInstantiate {
  Main [child1 kcomma child2] = ‛⟨child1⟩⟨kcomma⟩⟨child2⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛\n⟨lv⟩⟨ComponentName⟩ = ⟨KindName⟩ (self, f'{name}-⟨KindName⟩');⟨rv⟩’
}
`;

function dummy (text) {
    return '***DUMMY***' + text + '***dummy***';
}

function fmtChild (text) {
    console.log (text);
    return dummy (text);
}

function fmtChildInstances (text) {
    let instantiations = '';
    let childlist = ''
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildInstantiate", gSubChildInstantiate, fSubChildInstantiate));
    if (success) {
	return instantiations + '\nself._children = [' + childlist + ']';
    } else {
	var msg = `sub??? ${errormessage} sub???`;
	console.error (msg);
	return msg;
    }
}

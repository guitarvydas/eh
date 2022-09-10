  var gClass = gIdentityEmitter + String.raw`
xClass <: IdentityEmitter {
}
`;

var fClass =
    fIdentityEmitter
+ String.raw`
override {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛⟨vs1⟩⟨vs2⟩⟨Component⟩⟨vs3⟩⟨vs4⟩⟨resetselfkind ()⟩’
  Component [SelfDef SelfKind ComponentDef] = ‛\n⟨ComponentDef⟩’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n⟨vs1⟩⟨vs2⟩⟨ComponentJSON⟩⟨vs3⟩⟨vs4⟩’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma] = ‛⟨lb⟩⟨kkind⟩⟨kcolon1⟩⟨KindName⟩⟨kcomma⟩⟨kname⟩⟨kcolon2⟩⟨ComponentName⟩⟨rb⟩⟨optComma⟩’
  ComponentJSON [x] = ‛⟨x⟩’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛⟨ChildList⟩’
  ChildList [lb Child* rb] = ‛⟨fmtChild (Child)⟩’
  ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛\nclass ⟨topselfkind ()⟩ (Container): (-
⟨NonEmptyChildren⟩
⟨ComponentField⟩
super ().__init__ (parent, name, self._children, self._connections)
-)’
  ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛\nclass ⟨topselfkind ()⟩ (Leaf): (-
super ().__init__ (parent, name, null, null)
-)’
}
`;

/*
  ComponentContainerJSON [lb NonEmptyChildren ComponentField+ rb] = ‛⟨NonEmptyChildren⟩’
  ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛’
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


// 1.
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


// 2.
var gSubChildList = gClass + String.raw`
ChildList <: xClass {
  Main := Child+
}
`;

var fSubChildList =
      fClass
    + String.raw`
fSubChildInstantiate {
  Main [child+] = ‛⟨child⟩’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma?] = ‛⟨lv⟩⟨ComponentName⟩,⟨rv⟩’
  string [vs0 dq1 c* dq2 vs1] = ‛⟨vs0⟩⟨c⟩⟨vs1⟩’
}
`;

function fmtChildList (text) {
    let instantiations = '';
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildList", gSubChildList, fSubChildList));
    if (success) {
	return instantiations;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}


/* calls sub-parsers and sub-fmts to format child lists */
function fmtChild (text) {
    console.log (text);
    var instances = fmtChildInstances (text);
    var childList = fmtChildList (text);
    return instances + '\nself._children = [' + childList + ']';;
}


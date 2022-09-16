  var cl_gClass = gIdentityEmitter + String.raw`
xClass <: IdentityEmitter {
}
`;

var cl_fClass =
    fIdentityEmitter
+ String.raw`
override {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛⟨vs1⟩⟨vs2⟩⟨Component⟩⟨vs3⟩⟨vs4⟩⟨resetselfkind ()⟩’
  Component [SelfDef SelfKind ComponentDef] = ‛\n⟨ComponentDef⟩’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n⟨vs1⟩⟨vs2⟩⟨ComponentJSON⟩⟨vs3⟩⟨vs4⟩’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma? more?] = ‛⟨lb⟩⟨kkind⟩⟨kcolon1⟩⟨KindName⟩⟨kcomma⟩⟨kname⟩⟨kcolon2⟩⟨ComponentName⟩⟨rb⟩⟨optComma⟩⟨more⟩’
  ComponentJSON [x] = ‛⟨x⟩’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛⟨ChildList⟩’
  ChildList [lb Child rb] = ‛⟨cl_fmtChild (Child)⟩’
  ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛\nclass ⟨topselfkind ()⟩ (Container): (-
def __init__ (self, parent, name):(-
⟨NonEmptyChildren⟩
⟨ComponentField⟩
super ().__init__ (parent, name, self._children, self._connections)
-)-)’
  ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛’

CField_connections [dq1 k dq2 kcolon ConnectionBody] = ‛self._connections = [(-⟨ConnectionBody⟩-)]’
ConnectionBody [lb Connection* optcomma* rb] = ‛⟨cl_fmtConnections (Connection)⟩’

}
`;

/*
  ComponentLeafJSON  [lb EmptyChildren ComponentField+ rb] = ‛\nclass ⟨topselfkind ()⟩ (Leaf): (-
super ().__init__ (parent, name, null, null)
-)’
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
// #include "childinstanceparser.js"

// 2.
// #include "childlistparser.js"


/* calls sub-parsers and sub-fmts to format child lists */
function old_cl_fmtChild (text) {
    var instances = cl_fmtChildInstances (text);
    var childList = cl_fmtChildList (text);
    return instances + '\nself._children = [' + childList + ']';;
}

function cl_fmtChild (text) {
    var childList = cl_fmtChildList (text);
    var wrappedinstances = cl_fmtChildInstances (text + childList);
    return wrappedinstances;
}


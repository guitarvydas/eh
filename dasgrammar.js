  const dasgrammar = String.raw`

Verbatim {
  Main = "<unused>"
  vs = verbatimspace*
  verbatimspace = lv recursiveverbatim+ rv
  recursiveverbatim = recursiveverbatim_recur | recursiveverbatim_bottom
  recursiveverbatim_recur = lv recursiveverbatim+ rv
  recursiveverbatim_bottom = anythingVerbatim
  anythingVerbatim = anychar
  anything = anychar
  anychar= ~lv ~rv any

  lv = "\u{2039}" // must correspond to definitions in chars.js
  rv = "\u{203a}"
}

DaS <: Verbatim {
Main := Components
Components = vs "[" vs Component+ vs "]" vs
Component = "[" ComponentJSON "]" ","?
ComponentJSON = ComponentLeafJSON | ComponentContainerJSON
ComponentContainerJSON = "{" NonEmptyChildren ComponentField+ "}"
ComponentLeafJSON = "{" EmptyChildren ComponentField+ "}"

EmptyChildren (EmptyChildren) = dq "children" dq ":" "[" "]" ","?
NonEmptyChildren (NonEmptyChildren) = dq "children" dq ":" ChildList ","?

ComponentField = CField ","?

CField =
  | dq "id" dq ":" string                   -- id
  | dq "inputs" dq ":" StringList           -- inputs
  | dq "name" dq ":" string                 -- name
  | dq "kind" dq ":" string                 -- kind
  | dq "outputs" dq ":" StringList          -- outputs
  | dq "synccode" dq ":" string             -- synccode
  | dq "connections" dq ":" ConnectionBody  -- connections

ConnectionBody = "[" (Connection ","?)* "]"

Connection = "{" Receiver "," Sender "}"
Receiver = dq "receivers" dq ":" "[" "{" dq "receiver" dq ":" Pair "}" "]"
Sender = dq "senders" dq ":" "[" "{" dq "sender" dq ":" Pair "}" "]"

Pair = "{" kwcomponent ":" ComponentName "," kwport ":" PortName "}"
kwcomponent = dq "component" dq
kwport = dq "port" dq
ComponentName = string
PortName = string

ChildList = "[" Child* "]"
Child = "{" kkind ":" KindName "," kname ":" ComponentName "}" ","?
kkind = dq "kind" dq
KindName = string
kname = dq "name" dq


StringList = "[" vs (string ","?)* vs "]" vs
string (quoted string) = vs dq (~dq any)* dq vs
dq (dquote)= "\""
}
`;

const fVerbatim = String.raw`
Verbatim {
  vs [verbatimspaces*] = ‛⟨verbatimspaces⟩’
  verbatimspace [lv recursiveverbatim+ rv] = ‛⟨lv⟩⟨recursiveverbatim⟩⟨rv⟩’
  recursiveverbatim [x] = ‛⟨x⟩’
  recursiveverbatim_recur [lv recursiveverbatim+ rv] = ‛⟨lv⟩⟨recursiveverbatim⟩⟨rv⟩’
  recursiveverbatim_bottom [x] = ‛⟨x⟩’

  anythingVerbatim [c] = ‛⟨c⟩’
  anything [c] = ‛⟨c⟩’
  anychar [c] = ‛⟨c⟩’

  lv [c] = ‛⟨c⟩’
  rv [c] = ‛⟨c⟩’
}
`;

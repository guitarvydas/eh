# component
## parameters
  Component
## imports
  component_helper
  code
  connection
## query
  das_fact(kind,RID,rectangle)
  das_fact(name,RID,Name)
  das_fact(kindtype,RID,KindType)
  ( hasport(RID) ; (\+ hasport(RID), hasnoparent(RID), Inputs = [], Outputs = []) )
  ( (hasport(RID), inputs(RID,Inputs), outputs(RID,Outputs)) ; fail )
  children(RID,Children)
  codeof(RID,Code)
  connectionsof(RID,Connections)
  Component = component{id:RID, name:Name, kind:KindType, inputs:Inputs, outputs:Outputs, children:Children, connections:Connections, synccode:Code}
## json

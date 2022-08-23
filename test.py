from message import Message
from hello import Hello
from world import World

e = Hello (None)
e.inject (Message (e, '', True, None))
e.run ()
print (e.outputs ())

e = World (None)
e.inject (Message (e, '', 'hello', None))
e.run ()
print (e.outputs ())


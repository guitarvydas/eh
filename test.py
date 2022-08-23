from message import Message
from hello import Hello
from world import World

e = Hello (None)
e.inject (Message (e, '', True, None))
e.run ()
dict = e.outputs ()
print (dict)

firstoutput = e.outputs () ['stdout'][0]

e = World (None)
e.inject (Message (e, '', firstoutput, None))
e.run ()
print (e.outputs ())


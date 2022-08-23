from message import Message
from hello import Hello

e = Hello (None)
e.inject (Message (e, '', True, None))
e.run ()
print (e.outputs ())


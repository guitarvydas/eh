from message import Message
from echo import Echo

e = Echo (None)
e.inject (Message (e, '', 'hello', None))
e.run ()
print (e.outputs ())


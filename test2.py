# rewrite test.py using a Container
from sender import Sender
from message import Message
from helloworld import HelloWorld

hw = HelloWorld (None, 'HelloWorld instance')
hw.inject (Message (Sender (hw, 'stdin'), True, None))
hw.run ()
print (hw.outputs ())

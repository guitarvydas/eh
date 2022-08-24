# rewrite test.py using a Container
from message import Message
from helloworld import HelloWorld

hw = HelloWorld (None, 'HelloWorld instance')
hw.inject (Message (hw, 'stdin', True, None))
hw.run ()
print (hw.outputs ())

# rewrite test.py using a Container
from sender import Sender
from message import Message
from helloworld import HelloWorld

hw = HelloWorld (None, '❲HelloWorld instance❳')
hw.inject (Message ('stdin', True, 'test2'))
hw.run ()
print (hw.outputs ())

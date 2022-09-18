# rewrite test.py using a Container
from sender import Sender
from message import Message
from helloworldhelloworld import HelloWorldHelloWorld

hwhw = HelloWorldHelloWorld (None, '❲HelloWorldHelloWorld instance❳')
hwhw.inject (Message ('stdin', True, 'test2'))
hwhw.run ()
print (hwhw.outputs ())

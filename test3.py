# rewrite test.py using a Container
from sender import Sender
from message import Message
from helloworldwrapper import HelloWorldWrapper

hww = HelloWorldWrapper (None, '❲HelloWorld Wrapper instance❳')
hww.inject (Message ('stdin', True, 'test2'))
hww.run ()
print (hww.outputs ())

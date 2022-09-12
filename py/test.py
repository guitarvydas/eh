from message import Message
from generated import HelloWorld
hw = HelloWorld (None, '❲HelloWorld instance❳')
hw.inject (Message ('stdin', True, 'test2'))
hw.run ()
print (hw.outputs ())

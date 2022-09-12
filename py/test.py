from inputmessage import InputMessage
from generated import HelloWorld
hw = HelloWorld (None, '❲HelloWorld instance❳')
hw.inject (InputMessage (Null, 'stdin', True, 'test2'))
hw.run ()
print (hw.outputs ())

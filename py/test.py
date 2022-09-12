from inputmessage import InputMessage
from generated import HelloWorld
hw = HelloWorld (None, '❲HelloWorld instance❳')
hw.inject (InputMessage (None, 'stdin', True, 'test'))
hw.run ()
print (hw.outputs ())

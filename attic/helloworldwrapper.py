from message import Message
from container import Container
from connect import Connect
from sender import Sender
from receiver import Receiver
from helloworld import HelloWorld

class HelloWorldWrapper (Container):
    def __init__ (self, parent, name):
        hw = HelloWorld (None, f'❲{name}[hw]❳')
        self._children = [hw]
        self._connections = [
            Connect (Sender (self, 'stdin'), Receiver (hw, 'stdin'), self.punt),
            Connect (Sender (hw, 'stdout'), Receiver (self, 'stdout'), self.routeoutput)
            ]
        super ().__init__ (parent, name, self._children, self._connections)

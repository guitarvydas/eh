from message import Message
from container import Container
from connect import Connect
from sender import Sender
from receiver import Receiver
from hello import Hello
from world import World

class HelloWorld (Container):
    def __init__ (self, parent, name):
        h = Hello (None, f'{name}⟪Hello instance⟫')
        w = World (None, f'{name}⟪World instance⟫')
        self._children = [h, w]
        self._connections = [
            Connect (Sender (self, 'stdin'), Receiver (h, 'stdin'), self.punt),
            Connect (Sender (h, 'stdout'), Receiver (w, 'stdin'), self.route),
            Connect (Sender (w, 'stdout'), Receiver (self, 'stdout'), self.routeoutput)
            ]
        super ().__init__ (parent, name, self._children, self._connections)

from message import Message
from container import Container
from connect import Connect
from sender import Sender
from receiver import Receiver
from hello import Hello
from world import World

class HelloWorldHelloWorld (Container):
    def __init__ (self, parent, name):
        h = Hello (None, f'❲{name}[Hello instance]❳')
        w1 = World (None, f'❲{name}[World 1 instance]❳')
        w2 = World (None, f'❲{name}[World 2 instance]❳')
        self._children = [h, w1, w2]
        self._connections = [
            Connect (Sender (self, 'stdin'), Receiver (h, 'stdin'), self.punt),
            Connect (Sender (h, 'stdout'), Receiver (w1, 'stdin'), self.route),
            Connect (Sender (h, 'stdout'), Receiver (w2, 'stdin'), self.route),
            Connect (Sender (w1, 'stdout'), Receiver (self, 'stdout'), self.routeoutput),
            Connect (Sender (w2, 'stdout'), Receiver (self, 'stdout'), self.routeoutput)
            ]
        super ().__init__ (parent, name, self._children, self._connections)



from message import Message
from sender import Sender
from selfsender import SelfSender
from receiver import Receiver
from selfreceiver import SelfReceiver
from connect import Connect
from container import Container
from Hello import Hello
from World import World
class HelloWorld (Container): 
  def __init__ (self, parent, name):
    cell_7 = Hello (self, f'{name}-Hello');
    cell_8 = World (self, f'{name}-World');
    self._children = [cell_7,cell_8]
    self._connections = [
      Connect (SelfSender (self,'stdin'), Receiver (cell_7,'stdin'), self.down),
      Connect (Sender (cell_7,'stdout'), Receiver (cell_8,'stdin'), self.route),
      Connect (Sender (cell_8,'stdout'), SelfReceiver (self,'stdout'), self.up)
      ]
    super ().__init__ (parent, name, self._children, self._connections)
    

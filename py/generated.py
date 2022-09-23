

from message import Message
from sender import Sender
from selfsender import SelfSender
from receiver import Receiver
from selfreceiver import SelfReceiver
from upconnect import UpConnect
from downconnect import DownConnect
from routeconnect import RouteConnect
from passthroughconnect import PassThroughConnect
from container import Container
from World import World
from Hello import Hello
from World import World
class HelloWorld (Container): 
  def __init__ (self, parent, name):
    cell_19 = World (self, f'{name}-World-cell_19');
    cell_7 = Hello (self, f'{name}-Hello-cell_7');
    cell_8 = World (self, f'{name}-World-cell_8');
    self._children = [cell_19,cell_7,cell_8]
    self._connections = [
      DownConnect (SelfSender (self,'stdin'), Receiver (cell_7,'stdin')),
      UpConnect (Sender (cell_19,'stdout'), SelfReceiver (self,'stdout')),
      RouteConnect (Sender (cell_7,'stdout'), Receiver (cell_19,'stdin')),
      RouteConnect (Sender (cell_7,'stdout'), Receiver (cell_8,'stdin')),
      UpConnect (Sender (cell_8,'stdout'), SelfReceiver (self,'stdout'))
      ]
    super ().__init__ (parent, name, self._children, self._connections)
    


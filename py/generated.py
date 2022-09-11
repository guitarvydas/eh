

from message import Message
from container import Container
from connect import Connect
from sender import Sender
from receiver import Receiver
from "Hello" import "Hello"
from "World" import "World"
class "HelloWorld" (Container): 
  cell_7 = Hello (self, f'{name}-Hello');
  cell_8 = World (self, f'{name}-World');
  self._children = [cell_7,cell_8]
  self._connections = [
    Connect (SelfSender ('.','a'), Receiver ('cell_7','b'), self.down),
    Connect (Sender ('cell_7','c'), Receiver ('cell_8','d'), self.route),
    Connect (Sender ('cell_8','e'), SelfReceiver ('.','f'), self.up)
    ]
  super ().__init__ (parent, name, self._children, self._connections)
  
# class "Hello" (Leaf): 
#   super ().__init__ (parent, name, null, null)
  
# class "World" (Leaf): 
#   super ().__init__ (parent, name, null, null)
  

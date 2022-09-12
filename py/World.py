from porthandler import PortHandler
from procedure import Procedure

class World (Procedure):
    def f1 (self, message):
        self.send (self, 'stdout', message.data, message)
        self.send (self, 'stdout', 'world', message)
        self.send (self, 'out2', message.data.upper (), message)
        self.send (self, 'out2', 'vorld', message)

    def __init__ (self, parent, name):
        h1 = PortHandler ('*', self.f1)
        super ().__init__ (parent=parent, name=name, portHandler=h1)

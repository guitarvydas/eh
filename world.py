from porthandler import PortHandler
from procedure import Procedure

class World (Procedure):
    def f1 (self, message):
        self.send ('stdout', message.data, message)
        self.send ('stdout', 'world', message)

    def __init__ (self, parent):
        h1 = PortHandler ('', self.f1)
        super ().__init__ (parent=parent, name='world', portHandler=h1)

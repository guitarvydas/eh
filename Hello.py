from porthandler import PortHandler
from procedure import Procedure

class Hello (Procedure):
    def f1 (self, message):
        self.send ('stdout', 'hello', message)

    def __init__ (self, parent):
        h1 = PortHandler ('', self.f1)
        super ().__init__ (parent=parent, name='hello', portHandler=h1)

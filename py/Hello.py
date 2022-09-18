from porthandler import PortHandler
from procedure import Procedure

class Hello (Procedure):
    def f1 (self, message):
        print (f'Hello self {type(self)}')
        self.send (self, 'stdout', 'hello', message)

    def __init__ (self, parent, name):
        h1 = PortHandler ('*', self.f1)
        super ().__init__ (parent=parent, name=name, portHandler=h1)

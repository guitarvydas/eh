from porthandler import PortHandler
from procedure import Procedure

class Echo (Procedure):
    def f1 (self, message):
        self.send ('stdout', message.data, message)

    def __init__ (self, parent):
        h1 = PortHandler ('', self.f1)
        super ().__init__ (parent=parent, name='echo', portHandler=h1)

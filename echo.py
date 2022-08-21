from porthandler import PortHandler
from procedure import Procedure

class Echo (Procedure):
    def f1 (self, message):
        self.send ('stdout', message.data, message)

    def __init__ (self, buildEnv, runEnv):
        h1 = PortHandler ('', self.f1)
        super ().__init__ (h1)

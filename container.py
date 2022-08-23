from eh import EH
from state import State
from message import Message
from porthandler import PortHandler

class Container (EH):
    def __init__ (self, parent, name, children, connections):
        defaultName = 'default'
        handler = PortHandler ('*', self.handle)
        s = State (machine=self, name=defaultName, enter=None, handlers=[handler], exit=None, childMachine=None)
        super ().__init__ (parent = parent,
                        name = name,
                        defaultStateName = defaultName,
                        enter = self.noop,
                        exit = self.noop,
                        states = [s])

    def noop (self):
        pass

    # 4 possible routings...
    def punt (self, sender, receiver, message):
        # from input of Container to input of Child
        m = Message (message.sender, receiver.port, message.data, message.trail)
        who = receiver.component
        who.enqueueInput (m)

    def passthru (self, sender, receiver, message):
        # from input of Container to output of same Container
        m = Message (message.sender, receiver.port, message.data, message.trail)
        self.enqueueOutput (m)

    def route (self, sender, receiver, message):
        # from output of Child to input of Child
        m = Message (message.sender, receiver.port, message.data, message.trail)
        who = receiver.component
        who.enqueueInput (m)

    def routeoutput (self, sender, receiver, message):
        # from output of Child to output of Container
        m = Message (message.sender, receiver.port, message.data, message.trail)
        self.enqueueOutput (m)

    # end routings
        
    def handle (self, message):
        while self.anyChildReady ():
            for child in self._children:
                child.handleIfReady ()

# worker
    def anyChildReady (self):
        r = False
        for child in self._children:
            if child.isReady ():
                r = True
        return r


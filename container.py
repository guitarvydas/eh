from eh import EH
from state import State
from sender import Sender
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
        m = Message (receiver.port, message.data, [message, message.trail])
        self.enqueueInput (m)

    def passthru (self, sender, receiver, message):
        # from input of Container to output of same Container
        m = Message (receiver.port, message.data, [message, message.trail])
        self.enqueueOutput (m)

    def route (self, sender, receiver, message):
        # from output of Child to input of Child
        m = Message (receiver.port, message.data, [message, message.trail])
        who = receiver.who
        who.enqueueInput (m)

    def routeoutput (self, sender, receiver, message):
        # from output of Child to output of Container
        m = Message (receiver.port, message.data, [message, message.trail])
        self.enqueueOutput (m)

    # end routings
        
    def handle (self, message):
        self.puntInputToChildren (message)
        self.runToCompletion ()

    def routeOutputs (self, child):
        outputs = child.outputs ()
        for outputMessage in outputs:
            self.handleAllConnectionsForSender (Sender (child, outputMessage.port), outputMessage)
            


# workers
    def puntInputToChildren (self, message):
        self.handleAllConnectionsForSender (Sender (self, message.port), message)
                
    def handleAllConnectionsForSender (self, sender, message):
        for connection in self._connections:
            connection.attemptToHandle (sender, message)
                
    def runToCompletion (self):
        while self.anyChildReady ():
            for child in self._children:
                child.handleIfReady ()
                self.routOutputs (child)

    def anyChildReady (self):
        r = False
        for child in self._children:
            if child.isReady ():
                r = True
        return r


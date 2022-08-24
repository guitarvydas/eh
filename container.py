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
        print (f'punt {message} ... {sender.name ()} -> {receiver.name ()}')
        receiver.enqueueInput (message)

    def passthrough (self, sender, receiver, message):
        # from input of Container to output of same Container
        print (f'passthrough {message}')
        self.enqueueOutput (message)

    def route (self, sender, receiver, message):
        # from output of Child to input of Child
        print (f'route {message}')
        receiver.enqueueInput (message)

    def routeoutput (self, sender, receiver, message):
        # from output of Child to output of Container
        print (f'routeoutput {message}')
        self.enqueueOutput (message)

    # end routings
        
    def handle (self, message):
        self.puntInputToChildren (message)
        self.runToCompletion ()

    def routeOutputs (self, child):
        outputs = child.outputs ()
        for outputMessage in outputs:
            self.handleAllConnectionsForSender (Sender (child, outputMessage.port), outputMessage)
            

    def name (self):
        return self._name
    
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
                self.routeOutputs (child)

    def anyChildReady (self):
        r = False
        for child in self._children:
            if child.isReady ():
                r = True
        return r


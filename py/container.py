from sender import Sender
from message import Message
from porthandler import PortHandler
from state import State
from eh import EH

debugRouting = False

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
    def down (self, sender, receiver, inmessage):
        # from input of Container to input of Child
        if debugRouting:
            print (f'punt {message} ... {sender.name ()} -> {receiver.name ()}')
        mappedMessage = Message (receiver._port, message.data, inmessage)
        receiver._who.enqueueInput (mappedMessage)

    def passthrough (self, sender, receiver, inmessage):
        # from input of Container to output of same Container
        if debugRouting:
            print (f'passthrough {message} ... {sender.name ()} -> {receiver.name ()}')
        mappedMessage = Message (receiver._port, message.data, inmessage)
        self.enqueueOutput (mappedMessage)

    def route (self, sender, receiver, inmessage):
        # from output of Child to input of Child
        if debugRouting:
            print (f'route {message} ... {sender.name ()} -> {receiver.name ()}')
        mappedMessage = Message (receiver._port, message.data, inmessage)
        receiver._who.enqueueInput (mappedMessage)

    def up (self, sender, receiver, outmessage):
        # from output of Child to output of Container
        if debugRouting:
            print (f'routeoutput {message} ... {sender.name ()} -> {receiver.name ()}')
        mappedMessage = Message (receiver._port, message.data, inmessage)
        self.enqueueOutput (mappedMessage)

    # end routings
        
    def handle (self, message):
        for connection in self._connections:
            connection.conditionalHandle (self, message)
        self.runToCompletion ()

    def name (self):
        return self._name
    
# helpers
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


from eh import EH
class Container (EH):
    def __init__ (self, parent, name, children, connections):
        defaultName = 'default'
        s = State (machine=self, name=defaultName, enter=None, handlers=[portHandler], exit=None, childMachine=None)
        super ().__init__ (parent = parent,
                        name = name,
                        defaultStateName = defaultName,
                        enter = self.noop,
                        exit = self.noop,
                        states = [s])

    def noop (self):
        pass

    def punt (sender, receiver, message):
        m = Message (message.sender, receiver.port, message.data, message.trail)
        who = receiver.component
        if self == who:
            self.enqueueOutput (m)
        else:
            who.enqueueInput (m)

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


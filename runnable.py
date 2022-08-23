class Runnable:
    def __init__ (self, parent, name, top):
        self._parent = parent
        self._runname = name
        self._top = top

    def runName (self):
        return self._runname

    def run (self):
        while self.isBusy ():
            self.step ()
        while self.handleIfReady ():
            while self.isBusy ():
                self.step()


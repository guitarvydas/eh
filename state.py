class State:
    def __init__ (self, machine, name, enter, handlers, exit, childMachine):
        self._machine = machine
        self._name = name
        self._enter = enter
        self._handlers = handlers
        self._exit = exit
        self._childMachine = childMachine
        
    def enter (self):
        if  self._enter:
            self._enter (self)
        if (self._childMachine):
            self._childMachine.enter ()

    def exit (self):
        if (self._childMachine):
            self._childMachine.exit ()
        if self._exit:
            self._exit (self)

    def handle (self, message):
        r = self.handlerChain (self._handlerFunctions, message)
        if r:
            return r
        elif self._childMachine:
            return self._childMachine.handle (message)
        else:
            return False

    def step (self):
        if self._childMachine:
            self._childMachine.step ()
        else:
            pass
    
    def isBusy (self):
        if self._chidMachine:
            return self._childMachine.isBusy ()
        else:
            return False

# worker bees
    def Fail (self, message):
        raise Exception (f'unhandled message {message.port} for {self.name}')
        return False

    def handlerChain (self, message, functionList, subLayer):
        if 0 == len (functionList):
            if subLayer:
                return subLayer.handle (message)
            else:
                return False
        else:
            handler = functionList.pop (0)
            restOfFunctionList = functionList
            if (message.port == handler.port):
                handler.func (message)
                return True
            else:
                return self.handlerChain (message.port, message, restOfFunctionList, subLayer)
    

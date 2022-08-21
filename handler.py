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
    

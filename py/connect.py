class Connect:
    def __init__ (self, sender, receiver, routingFunction):
        self._sender = sender
        self._receiver = receiver
        self._routingFunction = routingFunction

    def conditionalHandle (self, sender, message):
        if (self._sender.match (sender)):
            self._routingFunction (self._sender, self._receiver, message)
            

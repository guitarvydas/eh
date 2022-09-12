class Connect:
    def __init__ (self, sender, receiver, routingFunction):
        self._sender = sender
        self._receiver = receiver
        self._routingFunction = routingFunction

    def on (self, senderComponent, message):
        senderMatch = (senderComponent == self._sender._who)
        portMatch = (self._sender.port == message.port)
        if (senderMatch and portMatch):
            self._routingFunction (self._sender, self._receiver, message)
        else:
            pass

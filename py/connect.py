class Connect:
    def __init__ (self, sender, receiver, routingFunction):
        self._sender = sender
        self._receiver = receiver
        self._routingFunction = routingFunction

    def guardedDeliver (self, message):
        # try to deliver the message
        # deliver only if message's from and port match this connection's sender's from and port, otherwise do nothing
        if (self._sender.match (message.xfrom, message.port)):
            self._routingFunction (self._sender, self._receiver, message)
        else:
            pass

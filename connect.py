class Connect:
    def handle (self, message):
        if message.port == self._sender.port:
            self._exec (self._sender, self._receiver, message)

    def __init__ (self, sender, receiver, func):
        self._sender = sender
        self._receiver = receiver
        self._exec = func

    def matchSender (self, other):
        return self._sender.matchSender (other)

from message import Message

class Connect:
    def __init__ (self, sender, receiver, func):
        self._sender = sender
        self._receiver = receiver
        self._exec = func

    def attemptToHandle (self, sender, message):
        if sender.matchSender (self._sender.port):
            m = self.mapMessageForReceiver (message)
            self._exec (self._sender, self._receiver, m)

    def matchSender (self, other):
        return self._sender.matchSender (other)

    def mapMessageForReceiver (self, message, sender):
        mapped = Message (self._receiver._port, message.data, [sender, message.trail])
        return mapped

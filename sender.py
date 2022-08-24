class Sender:
    def __init__ (self, component, port):
        self._who = component
        self._port = port

    def matchSender (self, othersender):
        return ((self._who == othersender._who) and (self._port == othersender.port))

    @property
    def port (self):
        return self._port
    

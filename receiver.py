class Receiver:
    def __init__ (self, component, port):
        self._who = component
        self._port = port

    @property
    def port (self):
        return self._port

    @property
    def who (self):
        return self._who

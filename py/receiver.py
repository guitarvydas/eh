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

    def name (self):
        return f'{self._who.name ()}/{self._port}'

    def enqueueInput (self, message):
        self._who.enqueueInput (message)


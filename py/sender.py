class Sender:
    def __init__ (self, component, port):
        self._who = component
        self._port = port

    def match (self, othersender):
        whomatch = (self._who == othersender._who)
        portmatch = (self._port == othersender._port)
        return (whomatch and portmatch)

    @property
    def port (self):
        return self._port

    @property
    def who (self):
        return self._who

    def name (self):
        return f'{self._who.name ()}/{self._port}'


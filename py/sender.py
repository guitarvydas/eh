class Sender:
    def __init__ (self, component, port):
        self._from = component
        self._port = port

    def match (self, othersender, port):
        frommatch = None
        portmatch = (self._port == port)
        if (isinstance (othersender, Sender)):
            frommatch = (self._from == othersender._from)
        else:
            frommatch = (self._from == othersender)
        return (frommatch and portmatch)

    @property
    def port (self):
        return self._port

    @property
    def from (self):
        return self._from

    def name (self):
        return f'{self._from.name ()}/{self._port}'


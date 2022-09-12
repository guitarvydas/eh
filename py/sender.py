class Sender:
    def __init__ (self, component, port):
        self._who = component
        self._port = port

    def match (self, othersender, port):
        whomatch = None
        portmatch = (self._port == port)
        if (isinstance (othersender, Sender)):
            whomatch = (self._who == othersender._who)
        else:
            whomatch = (self._who == othersender)
        return (whomatch and portmatch)

    @property
    def port (self):
        return self._port

    @property
    def who (self):
        return self._who

    def name (self):
        return f'{self._who.name ()}/{self._port}'


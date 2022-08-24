class PortHandler:
    def __init__ (self, port, func):
        self._port = port
        self._func = func

    def matchPort (self, portName):
        r = False
        if self._port == '*':
            r = True
        elif self._port == portName:
            r = True
        else:
            pass
        return r

    @property
    def func (self):
        return self._func

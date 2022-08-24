# Message =
# | Sender Port Message State Trail -- encapsulated
# | Base                            -- bottom


class BaseMessage:
    def __init__ (self, data):
        self._data = data
    def __repr__ (self):
        return "%s" % (self._data)
    @property
    def data (self):
        return self._data

class Message (BaseMessage):
    def __init__ (self, port, data, trail):
        super ().__init__ (data)
        self._port = port
        self._trail = trail
        self._state = '?'
    def __repr__ (self):
        #return "<%s, '%s', '%s', %s>" % (self.sender.name (), self.port, self.data, self.trail)
        # .sender and .trail are included for debug, omit them for __repr__ (for now)
        return "<'%s','%s'>" % (self.port, self.data)

    def updateState(self, newState):
        if (newState == 'input'):
            self.state = 'input'
        elif (newState == 'output'):
            self.state = 'output'
        else:
            raise Exception ("illegal state for Message {newState}")

    @property
    def port (self):
        return self._port

    @property
    def trail (self):
        return self._trail

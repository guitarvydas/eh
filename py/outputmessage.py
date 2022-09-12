from message import Message
class OutputMessage (Message):
    def __init__ (self, from, port, data, trail):
        super.__init__ (from, port, data, trail)

    def __repr__ (self):
        return "<output: '%s','%s'>" % (self.port, self.data)
        

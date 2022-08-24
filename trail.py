class Trail:
    def __init__ (self, info):
        self._info = info

    def __repr__ (self):
        if (isinstance (self._info, str)):
            return self._info
        else:
            return self._info

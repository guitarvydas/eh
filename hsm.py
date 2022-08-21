class HSM:
    def __init__ (self, defaultStateName, enter, states, exit):
        self._defaultStateName = defaultStateName
        self._enter = enter
        self._states = states
        self._exit = exit
        self._state = None
        self.enter ()
        
    def enter (self):
        if self._enter:
            self._enter ()
        self._state = self.lookupState (self._defaultStateName, self._states)
        self._state.enter ()
        
    def exit (self):
        if self._exit:
            self._exit ()
        self._state.exit ()
        
    def next (self, stateName):
        self.exitState ()
        self._state = self.lookupState (stateName, self._states)
        self.enterState ()
        
    def reset (self):
        self._state.reset ()
        self._state.exit ()
        self.enterDefault ()

    def handle (self, message):
        self._state.handle (message)

    def step (self):
        self._state.step ()

    def isBusy (self):
        return self._state.isBusy ()

# worker

    def lookupState (self, name, stateList):
        if (0 >= len (stateList)):
            return None
        elif (name == stateList [0].name:
              return stateList [0]
        else:
              return self.lookupState (name, stateList [1:])

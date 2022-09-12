from fifo import FIFO
from sender import Sender
from outputmessage import OutputMessage

class SenderQueue:
    def __init__ (self):
        self._outputq = FIFO ()

    def outputs (self):
        # return a dictionary of FIFOs, one FIFO per output port
        resultdict = {}
        for message in self._outputq.asDeque ():
            if (not (message.port in resultdict)):
                resultdict [message.port] = FIFO ()
            resultdict [message.port].enqueue (message.data)
        resultdict2 = {}
        for key in resultdict:
            fifo = resultdict [key]
            r = list (fifo.asDeque ())
            r.reverse () ## newest result first
            resultdict2 [key] = r
        return resultdict2

    # internal - not exported
    def clearOutputs (self):
        self._outputq = FIFO ()

    def enqueueOutput (self, message):
        self._outputq.enqueue (message)
        

    def dequeueOutput (self):
        return self._outputq.dequeue ()

    def send (self, from, portname, data, causingMessage):
        m = OutputMessage (from, portname, data, causingMessage)
        m.updateState ('output')
        self._outputq.enqueue (m)

    def outputQueue (self):
        return self._outputq.asDeque ()

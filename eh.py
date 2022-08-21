from receiverqueue import ReceiverQueue
from senderqueue import SenderQueue
from runnable import Runnable
from hsm import HSM

class EH (HSM, ReceiverQueue, SenderQueue, Runnable):
    def __init__ (self, parent):
        self._parent = parent

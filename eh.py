from receiverqueue import ReceiverQueue
from senderqueue import SenderQueue
from runnable import Runnable
from hsm import HSM

class EH (HSM, ReceiverQueue, SenderQueue, Runnable):
    def __init__ (self, parent, name, defaultStateName, enter, states, exit):
        top = super (HSM, self).__init__ (name, defaultStateName, enter, states, exit)
        super (Runnable, self).__init__ (parent, name, top)

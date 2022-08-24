from message import Message
from sender import Sender
from hello import Hello
from world import World

h = Hello (None, 'Hello instance')
h.inject (Message ('*', True, None))
h.run ()
print (h.outputs ())

firstoutput = h.outputs () ['stdout'][0]

w = World (None, 'World instance')
w.inject (Message ('*', firstoutput, None))
w.run ()
print (w.outputs ())


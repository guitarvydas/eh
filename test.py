from message import Message
from sender import Sender
from hello import Hello
from world import World

h = Hello (None, 'Hello instance')
m = Message ('*', True, None)
print (m)
h.inject (m)
h.run ()
print (h.outputs ())

firstoutput = h.outputs () ['stdout'][0]

w = World (None, 'World instance')
w.inject (Message ('*', firstoutput, None))
w.run ()
print (w.outputs ())


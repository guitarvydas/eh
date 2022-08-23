from message import Message
from hello import Hello
from world import World

h = Hello (None)
h.inject (Message (h, '', True, None))
h.run ()
print (h.outputs ())

firstoutput = h.outputs () ['stdout'][0]

w = World (None)
w.inject (Message (w, '', firstoutput, None))
w.run ()
print (w.outputs ())


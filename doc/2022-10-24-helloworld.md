# update Oct. 24, 2022

This diagram:

![hello world eh-helloworld.png]

is transpiled to this JSON:
```
[
  [
    {
      "children": [ {"kind":"Hello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"} ],
      "connections": [
	{
	  "receivers": [ {"receiver": {"component":"cell_7", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"cell_6", "port":"stdin"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_8", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"cell_7", "port":"stdout"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_6", "port":"stdout"}} ],
	  "senders": [ {"sender": {"component":"cell_8", "port":"stdout"}} ]
	}
      ],
      "id":"cell_6",
      "inputs": ["cell_17" ],
      "kind":"HelloWorld",
      "name":"HelloWorld",
      "outputs": ["cell_15" ],
      "synccode":""
    }
  ],
  [
    {
      "children": [],
      "connections": [],
      "id":"cell_7",
      "inputs": ["cell_12" ],
      "kind":"Hello",
      "name":"Hello",
      "outputs": ["cell_10" ],
      "synccode":""
    }
  ],
  [
    {
      "children": [],
      "connections": [],
      "id":"cell_8",
      "inputs": ["cell_11" ],
      "kind":"World",
      "name":"World",
      "outputs": ["cell_14" ],
      "synccode":""
    }
  ]
]
```

and the above JSON is transpiled to this Python:
```
from message import Message
from sender import Sender
from selfsender import SelfSender
from receiver import Receiver
from selfreceiver import SelfReceiver
from upconnect import UpConnect
from downconnect import DownConnect
from routeconnect import RouteConnect
from passthroughconnect import PassThroughConnect
from container import Container
from Hello import Hello
from World import World
class HelloWorld (Container): 
  def __init__ (self, parent, name):
    cell_7 = Hello (self, f'{name}-Hello-cell_7');
    cell_8 = World (self, f'{name}-World-cell_8');
    self._children = [cell_7,cell_8]
    self._connections = [
      DownConnect (SelfSender (self,'stdin'), Receiver (cell_7,'stdin')),
      RouteConnect (Sender (cell_7,'stdout'), Receiver (cell_8,'stdin')),
      UpConnect (Sender (cell_8,'stdout'), SelfReceiver (self,'stdout'))
      ]
    super ().__init__ (parent, name, self._children, self._connections)
```

and is transpiled to Common Lisp (not shown here, but can be seen in eh.html).

Branch master has a wart - a hard-coded path (see README.md).  This will be fixed in branch dev.
const jsonsrc = String.raw`
[
  [
    {
      "children": [ {"kind":"Hello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"} ],
      "connections": [
	{
	  "receivers": [ {"receiver": {"component":"cell_7", "port":"b"}} ],
	  "senders": [ {"sender": {"component":"cell_6", "port":"a"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_8", "port":"d"}} ],
	  "senders": [ {"sender": {"component":"cell_7", "port":"c"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_6", "port":"f"}} ],
	  "senders": [ {"sender": {"component":"cell_8", "port":"e"}} ]
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
`;

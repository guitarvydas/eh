const jsonsrc = String.raw`
[
  [
    {
      "children": [],
      "connections": [],
      "id":"cell_19",
      "inputs": ["cell_20" ],
      "kind":"World",
      "name":"World",
      "outputs": ["cell_22" ],
      "synccode":""
    }
  ],
  [
    {
      "children": [ {"kind":"World", "name":"cell_19"},  {"kind":"Hello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"} ],
      "connections": [
	{
	  "receivers": [ {"receiver": {"component":"cell_7", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"cell_6", "port":"stdin"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_6", "port":"stdout"}} ],
	  "senders": [ {"sender": {"component":"cell_19", "port":"stdout"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_19", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"cell_7", "port":"stdout"}} ]
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
      "inputs": ["cell_18" ],
      "kind":"HelloWorld",
      "name":"HelloWorld",
      "outputs": ["cell_16" ],
      "synccode":""
    }
  ],
  [
    {
      "children": [],
      "connections": [],
      "id":"cell_7",
      "inputs": ["cell_13" ],
      "kind":"Hello",
      "name":"Hello",
      "outputs": ["cell_11" ],
      "synccode":""
    }
  ],
  [
    {
      "children": [],
      "connections": [],
      "id":"cell_8",
      "inputs": ["cell_12" ],
      "kind":"World",
      "name":"World",
      "outputs": ["cell_15" ],
      "synccode":""
    }
  ]
]
`;

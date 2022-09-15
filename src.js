const jsonsrc = String.raw`
[
  [
    {
      "children": [ {"kind":"Jello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"} ],
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
      "kind":"JelloWorld",
      "name":"JelloWorld",
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
      "kind":"Jello",
      "name":"Jello",
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

/* testing...
const jsonsrc = String.raw`
[
  [
    {
      "children": [ {"kind":"Jello", "name":"test1"},  {"kind":"World", "name":"test2"} ],
      "connections": [
	{
	  "receivers": [ {"receiver": {"component":"test1", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"test0", "port":"stdin"}} ]
	},
      ],
      "id":"test0",
      "kind":"Test",
      "name":"testname",
    }
  ],
  [
    {
      "children": [ {"kind":"Jello", "name":"xxx1"},  {"kind":"World", "name":"xxx2"} ],
      "connections": [
	{
	  "receivers": [ {"receiver": {"component":"xxx1", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"xxx0", "port":"stdin"}} ]
	},
      ],
      "id":"xxx0",
      "kind":"Xxx",
      "name":"xxxname",
    }
  ]
]
`;
*/

Transpile a diagram to JSON.

Current version uses .drawio format to transpile helloworld.drawio to helloworld.json.

Src.js is created from helloworld.json, ready for use in ../ehpy.

# Usage:
> make

# Comments
This version uses PROLOG (swipl) and JavaScript and Ohm-JS to help with the transpilation.

The converter is in the subdirectory das/ and its subdirectories.

This transpilation can probably be done more easily, using, say, Ohm-JS only. Some day I will try to do this (collaborators welcome).

Documentation, such as it is, was done with Obsidian and can be viewed with Obsidian or a markdown editor in doc/*.

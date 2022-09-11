# ė Overview
Computer programs can be written using pluggable units of LEGO®-like software.

ė (spelled "eh" in ASCII) is a proof-of-concept that shows how to build a "Hello World" program using 3 pluggable software units.

ė generates code in several "traditional" programming languages:
- C
- Python
- Lisp

Generating code for many other languages, like Rust, is possible.

ė subsumes the traditional notion of "operating systems" and "programming languages", by replacing the idea of "programming languages" with a more expressive notation.
# Teaser
An illustration of software-as-pluggable-units is shown in the diagram below.

![[hello world eh-helloworld.png]]

The diagram - for this POC - is drawn using off-the-shelf *draw.io* and transpiled to Python code using *make*.

In general, software units - Components - can have 0 or more inputs and 0 or more outputs.  In contrast, functional notation can only express components - functions - with exactly one input[^oneinput] and exactly one output.

[^oneinput]: The concept of "multiple arguments" to a function is syntactic sugar for de-structuring of a single input parameter block of data that arrives as a whole and at the same time.
# Secret Sauce
The secret sauce of ė is 
- The addition of *message passing* to complement constructs of *function calls*, i.e. the additional use of Queues instead of only using Stacks
- Layering, hierarchy - software units come in two basic types (1) Leaves and (2) Containers.

Leaf Components are what is currently thought of as *functions* and *libraries*.

Container Components are like *routers* (at the programming statement level, instead of the whole-computer level).  Containers compose applications using Leaf Components and other Container Components.  Containers can be nested to any depth, i.e. Containers are recursive layers.  Routing of messages is performed by Containers and is not hard-wired into Leaf Components, as is currently done with function-based programming languages.
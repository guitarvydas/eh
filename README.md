# ė - Goal and Overview

The goal of this project is to program computers using pluggable units of software.

To do this we need:
- micro-concurrency
- 0D
- layers, relative sofware units
- multiple languages.

## Hello World 
Very simple example
## Leaf
![Leaf](./hello%20world%20eh-Leaf.png)

## Container
![Container](hello%20world%20eh-helloworld.png)

## Re-Architecting
![Different%20Routing](hello%20world%20eh-helloworldworld.png)

# Benefits
- technical drawings come "for free"
- concurrency comes "for free"
- "build and forget" development
- distributed programming comes "for free"
- multiple-CPU paradigm
- ability to plug together software components to create mimimal set of functionality

further discussion...[[Eh - Benefits]]

# Usage
*make*

This runs *run.bash* which runs a single 0D Leaf component *echo.py* and prints its output queue at the command-line.

*Test.py* invokes *hello.py* and feeds it a trigger message (True).

Then *test.py* invokes *world.py* and feeds it the above output.

*World.py* is almost like *hello.py* except that *hello.py* does not echo its input whereas *world.py* does echo its input.  *World.py* emits 2 outputs for each input it receives.

Both components - *hello.py* and *world.py* send outputs to their respective output queues.

The final result is:
1. *hello.py* outputs ['hello'] on output port 'stdout'
2. *world.py* inputs 'hello' on its input port, then outputs ['hello', 'world'] on its output port 'stdout'. 

*Test.py* invokes the two components and sends them messages in sequence.  This process can be generalized to what I call a *Container* component, but, I didn't get there before the jam ended.

Note that the .outputs () method returns a dictionary of stacks (LIFO) of values for each port.  This was a conscious decision. LIFOs, Alists are what original McCarthy FP-style code used. Sector Lisp continues the tradition of using LIFOs.  I think that this is one of the secret ingredients for the anti-bloatwareness of Sector Lisp.  No RAM, therefore, no heaps, therefore, no mutation, therefore, simplified data access via push/pop/lambda-binding.  Lambda-binding and LIFO call-stacks fit together to make small code and no-fuss structure-sharing.

Sequencing in this paradigm is explicit and caused by the order of the *send*s.  Sequencing in most textual programming languages is implicit and is controlled by the syntax of the language (lines of code are ordered sequences).

## End of Jam
The jam ended before test.py worked correctly, but, today - 1 day after the jam - test.py is working.

## Post Jam
Next, would be to make a Container (Composite) component - *helloworld.py* that contained two components that can be chained together.  Chaining is not necessary in this paradigm and I keep it only to make the examples look more familiar.

After that would come a rearrangement of *helloworld.py* that would contain one *hello.py* and two *world.py*s, resulting in "['world', 'hello', 'world', 'hello']"
# Key Insights
- 0D - No Dependencies 
- FIFOs and LIFOs
- Pipelines
- Structured Message Passing
- "First Principles Thinking"
- Closures
- "Parallelism" is more than one thing
- Scalability
	- Pluggability is necessary for scalability, but, more elaborate (complicated) examples would be needed to show this off.

# Approach

## Formulate questions
Questions such as...
- Why do hardware designs tend to work while software designs fail and become more complicated?
- Pipelines are different from functions.  How are pipelines different? 
- Message passing.  Is message-passing possible in the synchronous paradigm?
- Message passing - asynchronous - has a bad rep because it is often ad-hoc.  Is there an equivalent to "structured programming" for async message-passing?
- Closures - are closures the same as "processes" in operating systems? 
- DaS - Diagrams as Syntax.  Why are most programming languages textual?
- Tells - what is currently considered difficult?  Multitasking, async, callbacks, mutation, sequencing, history, state ... Can these be improved?  Are they difficult because they're difficult or because our notation makes them difficult?
- Is "something" the same across all programming languages?
- What is parallelism?
- Operating Systems and Programming Languages were invented in the 1950's under the single-cpu assumption.  Is the single-cpu assumption still valid?
- Are end-users forced to use the "same" operating systems / computer environments as developers?

- Can the goal (pluggable components) be sub-divided into smaller sub-goals?
	- Which properties must components have to be pluggable?
	- Which properties inhibit pluggability?


## Synthesize
- upon answering the above questions, it is possible to synthesize a new programming environment?

(The most recent documentation is in Obsidian format](https://publish.obsidian.md/programmingsimplicity/2022-08-21-Eh+Pluggable+Software+Components))



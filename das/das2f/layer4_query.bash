
temp=temp${RANDOM}
# contains port


cat >${temp}.pl <<'~~~'
:- use_module(library(http/json)).
?- consult("fb.pl").
?- consult("/home/parallels/local-projects/eh/das/das2f/shapes.pl").
?- consult("/home/parallels/local-projects/eh/das/das2f/onSameDiagram.pl").
?- consult("/home/parallels/local-projects/eh/das/das2f/inside.pl").
?- consult("/home/parallels/local-projects/eh/das/das2f/names.pl").
?- consult("/home/parallels/local-projects/eh/das/das2f/ports.pl").
?- consult("/home/parallels/local-projects/eh/das/das2f/contains_port.pl").
query_helper(R,E):-
das_fact(kind,R,rectangle),
das_fact(kind,E,ellipse),
containsport(R,E),
true.
query:-
(setof([R,E],query_helper(R,E),Set),
json_write(user_output,Set,[width(128)])
)
;
json_write(user_output,[],[width(123)]).
~~~
cat >${temp}.js <<'~~~'
const fs = require ('fs');
var rawText = fs.readFileSync ('/dev/fd/0');
var parameters = JSON.parse(rawText);
parameters.forEach (p => {
  var R = p [0];
var E = p [1];
  
if (true) { console.log (`das_fact(contains,${R},${E}).`);};
});
  
~~~
swipl -g "consult(${temp})." -g 'query.' -g 'halt.' | node ${temp}.js
rm -f ${temp}.pl
rm -f ${temp}.js


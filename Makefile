TOOLS = das

all: install tools src.js

install:
	multigit -r

src.js: helloworld.json
	echo 'const jsonsrc = String.raw`' > src.js
	cat helloworld.json >> src.js
	echo '`;' >> src.js


tools:
	(cd das/dr ; make)
	(cd das/prep ; make)
	(cd das/d2f ; make)
	(cd das/das2f ; make)
	(cd das/das2j ; make)

helloworld.json : npmstuff tools helloworld.drawio
	das/generate.bash $(TOOLS) helloworld.drawio
	mv out.json helloworld.json

clean: rmdirs
	rm -rf das
	find . -name 'junk*' -exec rm -f '{}' ';'
	find . -name '_*' -exec rm -f '{}' ';'
	find . -name '*~' -exec rm -f '{}' ';'
	find . -name '#*' -exec rm -f '{}' ';'
	rm -f junk* */junk*
	rm -f helloworld.json
	rm -f _* */_*
	rm -f *~ */*~
	rm -f fb.pl

rmdirs:
	rm -rf py/__pycache__
	rm -rf das
	rm -rf fmt-js
	rm -rf node_modules

npmstuff:
	npm install ohm-js yargs atob pako


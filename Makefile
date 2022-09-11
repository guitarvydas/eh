all: src.js run

src.js: test5.json
	echo 'const jsonsrc = String.raw`' > src.js
	cat test5.json >> src.js
	echo '`;' >> src.js

# copy/paste output code from eh.html into py/generated.py
run:
	(cd py ; make run)


TOOLS = das
NODEMODULES=\
	node_modules/ohm-js \
	node_modules/yargs \
	node_modules/atob \
	node_modules/pako

tools:
	(cd das/dr ; make)
	(cd das/prep ; make)
	(cd das/d2f ; make)
	(cd das/das2f ; make)
	(cd das/das2j ; make)

test5.json : npmstuff tools test5.drawio
	das/generate.bash $(TOOLS) test5.drawio
	mv out.json test5.json

clean:
	(cd ./dr ; make clean)
	(cd ./prep ; make clean)
	(cd ./d2f ; make clean)
	(cd ./das2f ; make clean)
	(cd ./das2j ; make clean)
	rm -f layer*
	rm -f preprocessed*
	rm -f duct?_*
	rm -f *.json
	rm -rf _*
	rm -f *~

npmstuff:
	npm install ohm-js yargs atob pako


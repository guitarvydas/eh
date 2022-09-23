all: src.js run

src.js: test5.json
	echo 'const jsonsrc = String.raw`' > src.js
	cat test5.json >> src.js
	echo '`;' >> src.js

# copy/paste output code from eh.html into py/generated.py
run:
	(cd py ; make run)

eh-body.js: eh.html fmt-js/fmt-js.js fmt-js/transpile.js
	./scrape.bash

neh.js: eh-body.js neh-head.js neh-tail.js
	cat neh-head.js eh-body.js neh-tail.js >neh.js

nehl.js: eh-body.js neh-head.js nehl-tail.js
	cat neh-head.js eh-body.js nehl-tail.js >nehl.js

runpy: neh.js
	node neh.js >py/generated.py
	(cd py ; python3 test.py)

LISPFILES =\
lisp/connector.lisp \
lisp/container.lisp \
lisp/downconnect.lisp \
lisp/eh.lisp \
lisp/fifo.lisp \
lisp/generated.lisp \
lisp/hello.lisp \
lisp/hsm.lisp \
lisp/inputmessage.lisp \
lisp/load.lisp \
lisp/message.lisp \
lisp/outputmessage.lisp \
lisp/package.lisp \
lisp/passthroughconnect.lisp \
lisp/porthandler.lisp \
lisp/procedure.lisp \
lisp/receiver.lisp \
lisp/receiverqueue.lisp \
lisp/routeconnect.lisp \
lisp/runnable.lisp \
lisp/selfreceiver.lisp \
lisp/selfsender.lisp \
lisp/sender.lisp \
lisp/senderqueue.lisp \
lisp/state.lisp \
lisp/test.lisp \
lisp/upconnect.lisp \
lisp/world.lisp

lisp/generated.lisp: nehl.js
	node nehl.js >lisp/generated.lisp

runcl: lisp/generated.lisp $(LISPFILES)
	(cd lisp ; ./sbclrun.bash)

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


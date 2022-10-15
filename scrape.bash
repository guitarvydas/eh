# /bin/bash
grep '\<script src=' eh.html \
    | grep -v 'http' \
    | sed -e 's/><\/script>//g' \
    | sed -e 's/^[ 	]*<script src=//g' \
    | tr -d '"' \
    | sed -e 's/$/ \\/' \
    | sed -e '$s/\\//' \
	  >/tmp/files.txt

# insert contents of each file
# /tmp/nv.bash is a script that opens and prints each file to stdout
echo '#!/bin/bash' >/tmp/nv.bash
echo 'cat \\' >>/tmp/nv.bash
cat /tmp/files.txt >>/tmp/nv.bash

chmod a+x /tmp/nv.bash
/tmp/nv.bash >eh-body.js

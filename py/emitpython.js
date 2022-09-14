
function dump (s) {
    document.getElementById('pyoutput').value = 'DUMP:\n' + s;
}

function emitPython (transformedCode) {
    let r = true;
    let output = '';

    const boilerPlateImports = `
${lv}
from message import Message
from sender import Sender
from selfsender import SelfSender
from receiver import Receiver
from selfreceiver import SelfReceiver
from upconnect import UpConnect
from downconnect import DownConnect
from routeconnect import RouteConnect
from passthroughconnect import PassThroughConnect
from container import Container
${rv}
`;
    let childImports = '';
    let xclass = ''; // "xclass" to avoid any hint of name clash with "class" keyword...
    r && ([r, childImports] = test (transformedCode, "ChildImports", gChildImports, fChildImports));
    dump (childImports);
/*
    r && ([r, xclass] = test (transformedCode, "xClass", gClass, fClass));
    dump (xclass);
/*
    if (r) {
      	let finalCode = boilerPlateImports + ' [A] ' + childImports + ' [B] ' + xclass;
      	finalCode = removeVerbatimBrackets (finalCode);
      	finalCode = fixupCode (finalCode);
      	finalCode = indenter (finalCode);
      	document.getElementById('pyoutput').value = 'PYTHON:\n' + finalCode;
    }
*/
}


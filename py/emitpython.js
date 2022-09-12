
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
from connect import Connect
from container import Container
${rv}
`;
    let childImports = '';
    let xclass = ''; // "xclass" to avoid any hint of name clash with "class" keyword...
    var nochange = '<empty nochange>';
    r && ([r, nochange] = test (transformedCode, "IdentityEmitter", gIdentityEmitter, fIdentityEmitter));
    r && ([r, childImports] = test (transformedCode, "ChildImports", gChildImports, fChildImports));
    r && ([r, xclass] = test (transformedCode, "xClass", gClass, fClass));
    if (r) {
      	let finalCode = boilerPlateImports + childImports + xclass;
      	finalCode = removeVerbatimBrackets (finalCode);
      	finalCode = fixupCode (finalCode);
      	finalCode = indenter (finalCode);
      	document.getElementById('pyoutput').value = 'PYTHON:\n' + finalCode;
    }
}


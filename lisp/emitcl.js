
function dump (s) {
    document.getElementById('cloutput').value = 'DUMP:\n' + s;
}

function emitCommonLisp (transformedCode) {
    let r = true;
    let output = '';

    const boilerPlateImports = `
${lv}
${rv}
`;
    let xclass = ''; // "xclass" to avoid any hint of name clash with "class" keyword...

    {
	// intermediate tests - xclass invokes these for real

	var childtest = String.raw`{"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}`;
	let childInstances = cl_fmtChildInstances (childtest);
	dump (childInstances);

	let childList = cl_fmtChildList (childtest);
	dump (childList);

	let connectionstest = String.raw`
{"receivers":[{"receiver":{"component":"cell_7","port":"stdin"}}],"senders":[{"sender":{"component":"cell_6","port":"stdin"}}]}
{"receivers":[{"receiver":{"component":"cell_8","port":"stdin"}}],"senders":[{"sender":{"component":"cell_7","port":"stdout"}}]}
{"receivers":[{"receiver":{"component":"cell_6","port":"stdout"}}],"senders":[{"sender":{"component":"cell_8","port":"stdout"}}]}
`;
	let connections = cl_fmtConnections (connectionstest);
	dump (connections);
    }
    r && ([r, xclass] = test (transformedCode, "xClass", cl_gClass, cl_fClass));
    dump (xclass);
    if (r) {
      	let finalCode = boilerPlateImports + xclass;
      	finalCode = removeVerbatimBrackets (finalCode);
      	finalCode = fixupCode (finalCode);
      	finalCode = indenter (finalCode);
      	document.getElementById('cloutput').value = finalCode;
    }
}


  function emitCommonLisp (transformedCode) {
      let r = true;
      let output = '';

      const boilerPlate = `
${lv}
${rv}
`;
      let childImports = '';
      let xclass = ''; // "xclass" to avoid any hint of name clash with "class" keyword...
      var nochange = '<empty nochange>';
      r && ([r, nochange] = test (transformedCode, "IdentityEmitter", gIdentityEmitter, fIdentityEmitter));
      r && ([r, xclass] = test (transformedCode, "xClass", cl_gClass, cl_fClass));
      if (r) {
      	  let finalCode = boilerPlate + childImports + xclass;
      	  finalCode = removeVerbatimBrackets (finalCode);
      	  finalCode = fixupCode (finalCode);
      	  finalCode = indenter (finalCode);
      	  document.getElementById('cloutput').value = 'COMMON LISP:\n' + finalCode;
      }
  }


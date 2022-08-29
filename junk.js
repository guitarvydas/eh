  function stripQuotes (s) {
      return s.replace (/"/g,'');
  }
  
var xx = String.raw`"def"`;
console.log (stripQuotes (xx));

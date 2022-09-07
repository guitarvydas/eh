// selfkind mechanism ...

  var selfkindstack = [];
  
  function setSelfkind (s) {
      settop (selfkindstack, s);
      return '';
  }

  function selfkindreset () {
      stackreset (selfkindstack);
      return '';
  }

  

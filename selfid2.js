// selfid2 mechanism ...

  var selfid2stack = [];
  
  function setSelfid2 (s) {
      console.log (`setSelfid2 ${s}`);
      settop (selfid2stack, s);
      return '';
  }

  function maybeMapSelf (s) {
      var selfid2 = stacktop (selfid2stack);
      console.log (`maybeMapSelf ${s} ${selfid2}`);
      if (s === selfid2) {
	  return '"."';
      } else {
	  return s;
      }
  }

  function selfid2reset () {
      stackreset (selfid2stack);
      return '';
  }

  

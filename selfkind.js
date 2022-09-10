// selfkind mechanism ...

var selfkindstack = [];

function topselfkind () {
    return stacktop (selfkindstack);
}

function setselfkind (s) {
    settop (selfkindstack, s);
    return '';
}

function resetselfkind () {
    stackreset (selfkindstack);
    return '';
}

  

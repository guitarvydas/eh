sbcl --eval "(declaim (sb-ext:muffle-conditions cl:style-warning))" --load load.lisp --eval "(eh:test)" --eval "(sb-ext:exit)"

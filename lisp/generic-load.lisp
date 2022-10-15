(proclaim '(optimize (debug 3) (safety 3) (speed 0)))

(defun ld (fname)
  (let ((root "%%%/lisp"))
    (declare (optimize (debug 3) (safety 3) (speed 0)))
    (let ((name (format nil "~a/~a" root fname)))
      (load name))))

(ld "package.lisp")
(ld "fifo.lisp")
(ld "message.lisp")
(ld "inputmessage.lisp")
(ld "outputmessage.lisp")
(ld "porthandler.lisp")
(ld "receiverqueue.lisp")
(ld "senderqueue.lisp")
(ld "receiver.lisp")
(ld "selfreceiver.lisp")
(ld "sender.lisp")
(ld "selfsender.lisp")
(ld "connector.lisp")
(ld "downconnect.lisp")
(ld "upconnect.lisp")
(ld "routeconnect.lisp")
(ld "passthroughconnect.lisp")
(ld "runnable.lisp")
(ld "eh.lisp")
(ld "state.lisp")
(ld "hsm.lisp")
(ld "container.lisp")
(ld "procedure.lisp")
(ld "hello.lisp")
(ld "world.lisp")
(ld "generated.lisp")
(ld "test.lisp")

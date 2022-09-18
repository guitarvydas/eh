(defclass Hello (Procedure)
  ()
  (:default-initargs
   :port-handler (make-instance 'PortHandler :port "*" 
				    :func (lambda (self message)
(format *standard-output* "~%Hello self ~a" self)
					    (send self (machine self) "stdout" "hello" message)))))


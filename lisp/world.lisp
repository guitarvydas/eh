(defclass World (Procedure)
  ()
  (:default-initargs
   :port-handler (make-instance 'PortHandler :port "*" 
				     :func (lambda (self message)
					     (send self (machine self) "stdout" (data message) message)
					     (send self (machine self) "stdout" "world" message)))))

(defclass Hello (Procedure)
  ()
  (:default-initargs
   :port-handler (make-instance 'PortHandler :port "*" 
				    :func (lambda (self message)
					    (send self (machine self) "stdout" "hello" message)))))


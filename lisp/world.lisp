(defclass World (Procedure)
  ()
  (:default-initargs
   :port-handler (make-instance 'PortHandler :port "*" 
					     :func (lambda (self message)
						     (send self self "stdout" (data message) message)
						     (send self self "stdout" "world" message)))))

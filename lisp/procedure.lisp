(defclass Procedure (EH)
  ((port-handler :accessor port-handler :initarg :port-handler)))

(defmethod initialize-instance :after ((self Procedure) &key &allow-other-keys)
  (let ((default-name "default"))
    (let ((s (make-instance 'State :machine self :name default-name
			  :handlers (list (port-handler self))
			  :enter nil :exit nil :child-machine nil)))
      (setf (states self) (list s))
      (setf (default-state-name self) default-name))))
    

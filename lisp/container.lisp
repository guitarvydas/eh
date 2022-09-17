(defclass Container (EH) 
  ((children :accessor children :initarg :children :initform nil)
   (connections :accessor connections :initarg :connections :initform nil))
  (:default-initargs
   :default-state-name "idle"))

(defmethod initialize-instance :after ((self Container)  &key &allow-other-keys)  
   (let ((states (list (make-instance 'State 
                                      :machine self
                                      :name "idle"
                                      :enter nil
                                      :handlers (list (make-instance 'PortHandler  :port "*" :func #'handle))
                                      :exit nil
                                      :child-machine nil))))
     (setf (states self) states)
     (initialize-hsm self)))


(defmethod handle ((self EH) message)
  (mapc #'(lambda (connection)
	    (guarded-deliver connection message))
	(connections self))
  (run-to-completion self))

(defmethod run-to-completion ((self EH))
  (loop
    while (any-child-ready self)
    do (mapc #'(lambda (child)
		 (handle-if-ready child)
		 (route-outputs self child))
	     (children self))))

(defmethod any-child-ready ((self EH))
  (mapc #'(lambda (child)
	    (when (is-ready child)
	      (return-from any-child-ready t)))
	(children self))
  nil)

(defmethod route-outputs ((self EH) child)
  (let ((outputs (output-queue child)))
    (clear-outputs child)
    (mapc #'(lambda (msg)
	      (mapc #'(lambda (conn)
			(guarded-deliver conn msg))
		    (connections self)))
	  outputs)))

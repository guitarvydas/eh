(defclass PortHandler ()
  ((port :accessor port :initarg :port)
   (func :accessor funct :initarg :func)))

(defmethod matchPort ((self PortHandler) port-name)
  (cond ((equalp "*" (port self)) t)
	((equalp port-name (port self)) t)
	(t nil)))

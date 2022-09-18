(in-package "EH")

(defclass Sender ()
  ((from :accessor from :initarg :from)
   (port :accessor port :initarg :port)))

(defmethod match ((self Sender) othersender port)
  (and (eq (from self) othersender)
       (equalp (port self) port)))

(defmethod name ((self Sender))
  (format nil "~a/~a" (name (from self)) (port self)))


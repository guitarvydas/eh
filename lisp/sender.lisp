(defclass Sender ()
  ((xfrom :accessor xfrom :initarg :xfrom)
   (port :accessor port :initarg :port)))

(defmethod match ((self Sender) othersender port)
  (and (eq (xfrom self) othersender)
       (equalp (port self) port)))

(defmethod name ((self Sender))
  (format nil "~a/~a" (name (xfrom self)) (port self)))


(defclass Receiver ()
  ((who :accessor who :initarg :who)
   (port :accessor port :initarg :port)))

(defmethod name ((self Receiver))
  (format nil "~a/~a" (name (xfrom self)) (port self)))

(defmethod enqueue-input ((self Receiver) message)
  (enqueue-input (who self) message))

(defmethod enqueue-output ((self Receiver) message)
  (enqueue-output (who self) message))


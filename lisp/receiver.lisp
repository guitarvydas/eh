(defclass Receiver ()
  ((to :accessor to :initarg :to)
   (port :accessor port :initarg :port)))

(defmethod name ((self Receiver))
  (format nil "~a/~a" (name (to self)) (port self)))

(defmethod enqueue-input ((self Receiver) message)
  (enqueue-input (to self) message))

(defmethod enqueue-output ((self Receiver) message)
  (enqueue-output (to self) message))


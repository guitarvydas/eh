

(defun new-HelloWorld ()
  (let ((cell_7 (make-instance 'Hello :parent self :name (format nil "~a-~a" name "Hello"))))
    (let ((cell_8 (make-instance 'World :parent self :name (format nil "~a-~a" name "World"))))
      (let ((children (list cell_7 cell_8 )))
	(let ((connections (list  
			    (make-instance 'DownConnect :sender (make-instance 'SelfSender :component self :port "stdin") :receiver (make-instance 'Receiver :component cell_7 :port "stdin")) 
			    (make-instance 'RouteConnect :sender (make-instance 'Sender :component cell_7 :port "stdout") :receiver (make-instance 'Receiver :component cell_8 :port "stdin")) 
			    (make-instance 'UpConnect :sender (make-instance 'Sender :component cell_8 :port "stdout") :receiver (make-instance 'SelfReceiver :component self :port "stdout"))  )))
	  (make-instance 'Container :parent parent :name name :children children :connections connections))))))

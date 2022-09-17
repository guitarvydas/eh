(defun test ()
  (let ((hw (new-HelloWorld nil "hello world")))
    (let ((m (make-instance 'InputMessage :port "stdin" :data t :from nil :trail nil)))
      (inject hw m))))

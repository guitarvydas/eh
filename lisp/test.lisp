(in-package "EH")

(defun test ()
  (let ((hw (new-HelloWorld nil "hello world")))
    (let ((m (make-instance 'InputMessage :port "stdin" :data t :from hw :trail nil)))
      (inject hw m)
      (run hw)
      (outputs-LIFO-dictionary hw))))

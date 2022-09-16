;;      {"kind":"Jello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"}
(let ((cell_7 (make-instance 'Jello ...)))
  (let ((cell_8 (make-instance 'World ...)))
    ))

;;      {"kind":"Jello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"}, "@":stuff
(let ((cell_7 (make-instance 'Jello ...)))
  (let ((cell_8 (make-instance 'World ...)))
    stuff))

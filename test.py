from echo import Echo

e = Echo (None)
e.inject ('hello')
print (e.outputs ())


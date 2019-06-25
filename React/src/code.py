
n=input()
s=[]
for i in range(0,int(n)):
    x=input().split(' ')
    z=[]
    for i in range(0,len(x)):
       z.append(int(x[i]))
    s.append(int(z))
    
print (s)
    
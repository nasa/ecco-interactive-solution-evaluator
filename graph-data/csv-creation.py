import pandas as pd
import random

for i in range(642):
    a = []
    b = []
    bin = i+1

    for i in range(506):
        a.append(random.randint(0,100))
        b.append(random.randint(0,100))

    dictA = {'Y': a}
    dictB = {'Y': b}

    dfA = pd.DataFrame(dictA)
    dfA.to_csv(r'./A_' + str(bin) +'.csv', index=False)

    dfB = pd.DataFrame(dictB)
    dfB.to_csv(r'./B_' + str(bin) +'.csv', index=False)

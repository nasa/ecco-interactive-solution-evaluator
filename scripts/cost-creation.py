import pandas as pd
import random
import numpy as np

for i in range(1):
    a_list = [0] * 642
    bin = i

    for i in range(len(a_list)):
        a = random.randint(0,10)
        a_list[i] = a

    dictA = {'Cost': a_list}

    dfA = pd.DataFrame(dictA)
    dfA.to_csv(r'../stats/Sea Surface Salinity/Annual SSS/Cost.csv',index=False)
import pandas as pd
import random
import numpy as np

dates = np.arange('2021-04', '2022-04', dtype='datetime64[D]')


for i in range(642):
    a = np.random.uniform(low=0.0, high=1.0, size=len(dates))
    b = np.random.uniform(low=0.0, high=1.0, size=len(dates))
    bin = i


    a_red = [0] * len(a)
    b_red = [0] * len(b)

    r = .8

    a_red[0] = a[0]
    b_red[0] = b[0]

    for i in range(1,len(a)):
        a_red[i] = (r * a_red[i-1]) + ((1 - (r ** 2)) ** (0.5)) * a[i]
        b_red[i] = (r * b_red[i-1]) + ((1 - (r ** 2)) ** (0.5)) * b[i]

    dictA = {'Time': dates, 'Salinity': a_red}
    dictB = {'Time': dates, 'Salinity': b_red}

    dfA = pd.DataFrame(dictA)
    dfA.to_csv(r'../graph-data/Sea Surface Salinity/Annual SSS/Model/' + str(bin) +'.csv', index=True)

    dfB = pd.DataFrame(dictB)
    dfB.to_csv(r'../graph-data/Sea Surface Salinity/Annual SSS/Observed/' + str(bin) +'.csv', index=True)
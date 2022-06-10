import pandas as pd
import random
import numpy as np

#Dates are hardcoded and can be altered to make new dates for CSV files
dates = np.arange('2021-04', '2022-04', dtype='datetime64[D]')

#For loop to create 642 csv files with the size of the x-axis (dates)
for i in range(642):
    #Select a random value for the a and b premature traces
    a = np.random.uniform(low=0.0, high=1.0, size=len(dates))
    b = np.random.uniform(low=0.0, high=1.0, size=len(dates))
    #Set the current bin number
    bin = i

    #Make the actual traces with the size of the premature traces
    a_red = [0] * len(a)
    b_red = [0] * len(b)

    #Red noise value
    r = .8

    #Initalize the initial value of the premature trace to the actual traces
    a_red[0] = a[0]
    b_red[0] = b[0]

    #Red Noise formula to create traces that look like they have trends
    for i in range(1,len(a)):
        a_red[i] = (r * a_red[i-1]) + ((1 - (r ** 2)) ** (0.5)) * a[i]
        b_red[i] = (r * b_red[i-1]) + ((1 - (r ** 2)) ** (0.5)) * b[i]

    #Hardcoded header names to create the csv columns
    dictA = {'Time': dates, 'Salinity': a_red}
    dictB = {'Time': dates, 'Salinity': b_red}

    #Convert objects into CSVs. This is also hardcoded
    dfA = pd.DataFrame(dictA)
    dfA.to_csv(r'../graph-data/Sea Surface Salinity/Annual SSS/Model/' + str(bin) +'.csv', index=True)

    dfB = pd.DataFrame(dictB)
    dfB.to_csv(r'../graph-data/Sea Surface Salinity/Annual SSS/Observed/' + str(bin) +'.csv', index=True)
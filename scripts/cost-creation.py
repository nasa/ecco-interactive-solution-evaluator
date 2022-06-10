import pandas as pd
import random
import numpy as np

for i in range(1):
    #Create a list that is the size of 642 bins. This size can vary
    a_list = [0] * 642
    bin = i
    #Provide a random int into the list
    for i in range(len(a_list)):
        a = random.randint(0,10)
        a_list[i] = a
    #Make the list into a header:column
    dictA = {'Cost': a_list}
    #Convert the object into a CSV
    dfA = pd.DataFrame(dictA)
    dfA.to_csv(r'../stats/Sea Surface Salinity/Annual SSS/Cost.csv',index=False)
#!/usr/bin/python
import os
import re
import pandas as pd

df = pd.read_csv("scientific-board.csv")
file = open("scientific-board.yml", "w")
for id, row in df.iterrows():
    print(row["Kto"])
    file.write("- name: " + row["Kto"] + "\n")
    if str(row["Afiliacja"]) != "nan":
        file.write("  affiliation: " + str(row["Afiliacja"]) + "\n")
    if row["Czy jest zdjęcie?"]:
        file.write("  photo:  ./images/scientific-board/" + row["Kto"].replace(" ", "") + ".jpg\n")
    if str(row["Bio"]) != "nan":
        file.write("  bio: >- \n    " + str(row["Bio"]) + "\n")
    file.write("\n")
file.close()
print(df.info())
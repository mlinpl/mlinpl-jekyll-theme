#!/usr/bin/python
import os
import re
import pandas as pd

df = pd.read_csv("sheet.csv")

for filename in os.listdir('./images/organizers'):
    base = os.path.splitext(filename)[0]
    names = re.findall('[A-Z][^A-Z]*',base)
    if(len(names) and len(df[df["Nazwisko"] == names[len(names) - 1]])):
        df.loc[df["Nazwisko"] == names[len(names) - 1], "Nazwa pliku ze zdjęciem"] = filename

print(df.columns)
df["Team (co)Leader (✅)"] = df["Team (co)Leader (✅)"].isnull()
df.loc[df["LinkedIn"].isnull(), "LinkedIn"] = ""
df.loc[df["Twitter"].isnull(), "Twitter"] = ""
df.loc[df["Nazwa pliku ze zdjęciem"].isnull(), "Nazwa pliku ze zdjęciem"] = "empty.png"
file = open("_data/mlss-organizers.yml", "w")
for id, row in df.iterrows():
    print(row["Nazwisko"])
    file.write("- name: \"" + row["Imię"] + " " + row["Nazwisko"] + "\"\n")
    file.write("  team: \"" + row["Team"] + "\"\n")
    file.write("  teamLeader: \"" + str(not row["Team (co)Leader (✅)"]) + "\"\n")
    file.write("  linkedIn: \"" + row["LinkedIn"] + "\"\n")
    file.write("  twitter: \"" + row["Twitter"] + "\"\n")
    file.write("  image: \"images/organizers/" + row["Nazwa pliku ze zdjęciem"] + "\"\n")
    file.write("\n")
file.close()
print(df.info())
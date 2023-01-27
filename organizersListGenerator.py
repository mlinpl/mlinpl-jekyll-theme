#!/usr/bin/python
import os
import re
file = open("_data/mlss-organizers.yml", "w")
for filename in os.listdir('./images/organizers'):
    base = os.path.splitext(filename)[0]
    names = re.findall('[A-Z][^A-Z]*',base)
    file.writelines(["- name: \"" + ' '.join(names) + "\"\n",
                    "  image: \"./images/organizers/" + filename + "\"\n",
                    "\n"])
file.close()
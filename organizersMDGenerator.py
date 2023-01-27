#!/usr/bin/python
import os
import re
for filename in os.listdir('./images/organizers'):
    base = os.path.splitext(filename)[0]
    file = open("_organizers/" + base + ".md", "w")
    names = re.findall('[A-Z][^A-Z]*',base)
    file.writelines(["---\n",
                    "name: \"" + ' '.join(names) + "\"\n",
                    "image: \"./images/organizers/" + filename + "\"\n",
                    "---"])
    file.close()
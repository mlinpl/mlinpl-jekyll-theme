#!/usr/bin/python
import os
import sys
import re
import pandas as pd


CONFIGS = {
    "conference-organizers": {
        "sort_values": ["Kolejność na WWW", "Nazwisko", "Pełna nazwa roli"],
        "fields": {
            "name": lambda row: row["Imię"].strip() + " " + row["Nazwisko"].strip(),
            "title": lambda row: row["Pełna nazwa roli"].strip(),
            "linkedin": lambda row: row["LinkedIn"].strip(),
            "twitter": lambda row: row["Twitter"].strip(),
            "image": lambda row: get_file(
                os.path.join(
                    "images/optimized/organizers-300x300/",
                    polish_to_ascii(row["Imię"].strip())
                    + polish_to_ascii(row["Nazwisko"].strip())
                    + ".webp",
                ),
                "images/empty.png",
            ),
        },
    },
    "cfc": {
        "sort_values": ["id", "time", "room"],
        "fields": {
            "author-name": lambda row: row["author-name"].strip(),
            "title": lambda row: '"' + row["title"].strip() + '"',
            "author-title": lambda row: '"' + row["affiliation"].strip() + '"',
            "abstract": lambda row: ">- \n    " + row["abstract"].strip().replace("\n", "\n    "),
            "author-bio": lambda row: ">- \n    " + row["author-bio"].strip().replace("\n", "\n    "),
            "co-authors": lambda row: row["co-authors"].strip(),
            "date": lambda row: row["day"].strip(),
            "time": lambda row: row["time"].strip(),
            "room": lambda row: row["room"].strip(),
            "session": lambda row: row["session"].strip(),
            "id": lambda row: row["id"],
            "author-image": lambda row: get_file(
                os.path.join(
                    "images/optimized/cfc-2023-600x600/", row["photo"].split(".")[0] + ".webp",
                ),
                "images/empty.png",
            ),
        },
    }
}


def get_file(path, empyt_path):
    if os.path.isfile(path):
        return path
    else:
        return empyt_path


PL_TO_ASCII = {
    "ą": "a",
    "ć": "c",
    "ę": "e",
    "ł": "l",
    "ń": "n",
    "ó": "o",
    "ś": "s",
    "ź": "z",
    "ż": "z",
    "Ą": "A",
    "Ć": "C",
    "Ę": "E",
    "Ł": "L",
    "Ń": "N",
    "Ó": "O",
    "Ś": "S",
    "Ź": "Z",
    "Ż": "Z",
}


def polish_to_ascii(text):
    for pl, ascii in PL_TO_ASCII.items():
        text = text.replace(pl, ascii)
    return text


def main(input_file, output_file, config):
    # Get config
    if config in CONFIGS:
        config = CONFIGS[config]
    else:
        raise Exception(f"Config {config} not found, available configs: {list(CONFIGS.keys())}")

    # Load and sort organizers
    sep = ","
    if input_file.endswith(".tsv"):
        sep = "\t"

    df = pd.read_csv(input_file, sep=sep, encoding="utf-8")
    print(df.info())

    df.fillna("", inplace=True)
    df.sort_values(by=config["sort_values"], inplace=True, ascending=True)

    with open(output_file, "w") as file:
        i = 0
        for id, row in df.iterrows():
            for j, (field, func) in enumerate(config["fields"].items()):
                if j == 0:
                    file.write("- ")
                else:
                    file.write("  ")
                file.write(f'{field}: {func(row)}\n')
                df.loc[id, field] = func(row)
            file.write("\n")
            i += 1
        file.close()
    print(f"Written {i} rows to {output_file}")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: csv_to_yaml.py <input_file> <output_file> <config>")
    else:
        main(sys.argv[1], sys.argv[2], sys.argv[3])

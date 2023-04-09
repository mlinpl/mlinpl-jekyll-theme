#!/usr/bin/python
import os
import sys
import re
import pandas as pd


CONFIGS = {
    "conference-organizers": {
        "sort_values": ["Kolejność na WWW", "Pełna nazwa roli", "Nazwisko"],
        "fields": {
            "name": lambda row: row["Imię"].strip() + " " + row["Nazwisko"].strip(),
            "title": lambda row: row["Pełna nazwa roli"].strip(),
            "linkedin": lambda row: row["LinkedIn"].strip(),
            "twitter": lambda row: row["Twitter"].strip(),
            "image": lambda row: get_file(
                os.path.join(
                    "images/organizers-300x300/",
                    polish_to_ascii(row["Imię"].strip())
                    + polish_to_ascii(row["Nazwisko"].strip())
                    + ".webp",
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
        raise Exception(f"Config {config} not found")

    # Load and sort organizers
    df = pd.read_csv(input_file)
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
                file.write(f'{field}: "{func(row)}"\n')
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

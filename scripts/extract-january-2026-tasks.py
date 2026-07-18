#!/usr/bin/env python3
"""Extract the three task banks from a saved Formation TCF Canada January 2026 page."""

import argparse
import json
from pathlib import Path
from zipfile import ZipFile

from bs4 import BeautifulSoup


def clean(element):
    return "\n".join(part.strip() for part in element.stripped_strings if part.strip())


def cards(soup, border_class, task_label):
    candidates = soup.select(f"div.overflow-hidden.rounded-xl.border-2.{border_class}")
    return [
        card for card in candidates
        if any(span.get_text(strip=True) == task_label for span in card.find_all("span"))
    ]


def extract(archive_path):
    with ZipFile(archive_path) as archive:
        html_name = next(
            name for name in archive.namelist()
            if name.endswith(".html") and not name.startswith("__MACOSX/")
        )
        soup = BeautifulSoup(archive.read(html_name), "html.parser")

    task1_cards = cards(soup, "border-blue-200", "Tâche 1")
    task2_cards = cards(soup, "border-green-200", "Tâche 2")
    task3_cards = cards(soup, "border-purple-200", "Tâche 3")

    counts = {len(task1_cards), len(task2_cards), len(task3_cards)}
    if len(counts) != 1 or not task1_cards:
        raise RuntimeError(
            f"Expected equal non-zero task counts, got "
            f"T1={len(task1_cards)}, T2={len(task2_cards)}, T3={len(task3_cards)}"
        )

    combinations = []
    for index, (task1, task2, task3) in enumerate(zip(task1_cards, task2_cards, task3_cards), start=1):
        task1_body = task1.find_all("div", recursive=False)[1]
        task2_body = task2.find_all("div", recursive=False)[1]
        task1_prompt = task1_body.find("p", recursive=False)
        task2_prompt = task2_body.find("p", recursive=False)
        task3_body = task3.find("div", class_="space-y-4")
        task3_title = task3_body.find("h4")
        document_paragraphs = [
            block.find("p")
            for block in task3_body.find_all("div", recursive=False)
            if block.find("p", recursive=False)
        ][:2]

        if not task1_prompt or not task2_prompt or not task3_title or len(document_paragraphs) != 2:
            raise RuntimeError(f"Combination {index} is missing required source fields")

        combinations.append({
            "combination": index,
            "task1": {"prompt": clean(task1_prompt)},
            "task2": {"prompt": clean(task2_prompt)},
            "task3": {
                "title": clean(task3_title),
                "document1": clean(document_paragraphs[0]),
                "document2": clean(document_paragraphs[1]),
            },
        })

    return {
        "source": "Formation TCF Canada — Sujets Expression Écrite Janvier 2026",
        "combinations": combinations,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    data = extract(args.archive)
    args.output.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Extracted {len(data['combinations'])} complete combinations to {args.output}")


if __name__ == "__main__":
    main()

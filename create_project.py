#!/usr/bin/env python3
"""
Project Structure Generator for bangla-china-imports Website
"""

import os

project_structure = {
    "bangla-china-imports": {
        "files": [
            "index.html",
            "about.html",
            "features.html",
            "contact.html",
            "blog.html",
            "login.html"
        ],
        "dirs": {
            "assets": {
                "dirs": {
                    "css": {
                        "files": [
                            "main.css",
                            "header.css",
                            "footer.css",
                            "animations.css",
                            "home.css",
                            "about.css",
                            "login.css"
                        ]
                    },
                    "js": {
                        "files": [
                            "three.min.js",
                            "main.js",
                            "animations.js",
                            "three-scene.js"
                        ]
                    },
                    "images": {},
                    "models": {}
                }
            }
        }
    }
}


def create_structure(base_path, structure):
    """Recursively create folders and files from structure dict"""
    os.makedirs(base_path, exist_ok=True)

    # Create files
    for file in structure.get("files", []):
        file_path = os.path.join(base_path, file)
        if not os.path.exists(file_path):
            with open(file_path, "w", encoding="utf-8") as f:
                # Put a small placeholder inside
                if file.endswith(".html"):
                    f.write(f"<!-- {file} template -->\n")
                elif file.endswith(".css"):
                    f.write(f"/* {file} stylesheet */\n")
                elif file.endswith(".js"):
                    f.write(f"// {file} script\n")
        print(f"Created: {file_path}")

    # Create directories recursively
    for dirname, substructure in structure.get("dirs", {}).items():
        dir_path = os.path.join(base_path, dirname)
        create_structure(dir_path, substructure)


if __name__ == "__main__":
    create_structure(".", project_structure["bangla-china-imports"])
    print("\n✅ Project structure generated successfully.")

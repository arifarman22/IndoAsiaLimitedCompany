import os
import glob

# Find all HTML files
html_files = glob.glob('*.html')

old_facebook = 'background: linear-gradient(135deg, #0084ff, #0066cc);'
new_facebook = 'background: linear-gradient(135deg, #1a365d, #2563eb);'

old_whatsapp = 'background: linear-gradient(135deg, #25d366, #128c7e);'
new_whatsapp = 'background: linear-gradient(135deg, #dc2626, #ea580c);'

for filename in html_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace colors
        updated = content.replace(old_facebook, new_facebook)
        updated = updated.replace(old_whatsapp, new_whatsapp)
        
        if updated != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(updated)
            print(f"Updated {filename}")
        else:
            print(f"Skipped {filename} (no changes needed)")
    except Exception as e:
        print(f"Error updating {filename}: {e}")

print("\nIcon colors updated successfully!")

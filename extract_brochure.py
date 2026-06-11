import fitz
import os

doc = fitz.open(r'H:\.shortcut-targets-by-id\1dEbTY8P9UvIoSVOkCqqrPs5s-5JlWTGp\1 Stonehaven Avenue Malvern East\08 Marketing\02 Brochure\V1\STONEHAVEN_brochure.pdf')

out_dir = r'C:\Users\harsh\.gemini\antigravity\scratch\project-stonehaven-react\brochure_pages'
os.makedirs(out_dir, exist_ok=True)

# Render key pages as images for visual reference
key_pages = [0, 1, 2, 3, 4, 5, 8, 15, 21, 24]
for i in key_pages:
    if i < len(doc):
        page = doc[i]
        pix = page.get_pixmap(dpi=150)
        pix.save(os.path.join(out_dir, f'page_{i+1}.jpg'))
        print(f'Saved page {i+1}')

# Get ALL colors from first 10 pages
print('\n=== COMPREHENSIVE COLOR EXTRACTION ===')
for i in range(min(len(doc), 15)):
    page = doc[i]
    drawings = page.get_drawings()
    fill_colors = set()
    stroke_colors = set()
    for d in drawings:
        if d.get('fill'):
            c = d['fill']
            hex_color = '#{:02x}{:02x}{:02x}'.format(int(c[0]*255), int(c[1]*255), int(c[2]*255))
            fill_colors.add(hex_color)
        if d.get('color'):
            c = d['color']
            hex_color = '#{:02x}{:02x}{:02x}'.format(int(c[0]*255), int(c[1]*255), int(c[2]*255))
            stroke_colors.add(hex_color)
    if fill_colors or stroke_colors:
        print(f'Page {i+1}:')
        if fill_colors:
            print(f'  Fill: {fill_colors}')
        if stroke_colors:
            print(f'  Stroke: {stroke_colors}')

# Get ALL unique fonts
print('\n=== ALL UNIQUE FONTS ===')
all_fonts = set()
for i in range(len(doc)):
    for f in doc[i].get_fonts():
        name = f[3]
        # Strip subset prefix
        if '+' in name:
            name = name.split('+')[1]
        all_fonts.add(name)
for font in sorted(all_fonts):
    print(f'  {font}')

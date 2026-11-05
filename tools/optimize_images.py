"""Create resized WebP copies of the site's large PNG/JPEG images.

Run from the repo root:  python tools/optimize_images.py
Originals are left in place; each output sits next to its source with a .webp
extension. Re-running only rebuilds WebPs that are missing or older than the source.
"""
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Longest side (px) allowed per folder; anything bigger is scaled down.
MAX_SIDE = {
    'assets/img/header': 1920,
    'assets/img/hero': 1920,
    'assets/img/shape': 1920,
    'assets/img/logo': 512,
}
DEFAULT_MAX_SIDE = 1600
QUALITY = 80
MIN_BYTES = 100 * 1024  # skip images that are already small

EXTRA_FILES = ['work-2.png']


def max_side_for(rel_path):
    folder = os.path.dirname(rel_path).replace('\\', '/')
    return MAX_SIDE.get(folder, DEFAULT_MAX_SIDE)


def convert(rel_path):
    src = os.path.join(ROOT, rel_path)
    dst = os.path.splitext(src)[0] + '.webp'
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return None

    im = Image.open(src)
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
    limit = max_side_for(rel_path)
    if max(im.size) > limit:
        im.thumbnail((limit, limit), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=QUALITY, method=6)
    return os.path.getsize(src), os.path.getsize(dst)


def candidates():
    for folder, _, files in os.walk(os.path.join(ROOT, 'assets', 'img')):
        for name in files:
            if name.lower().endswith(('.png', '.jpg', '.jpeg')):
                yield os.path.relpath(os.path.join(folder, name), ROOT)
    for name in EXTRA_FILES:
        yield name


def main():
    before = after = 0
    for rel in candidates():
        rel_fwd = rel.replace('\\', '/')
        if '_files/' in rel_fwd or rel_fwd.endswith('cottle-icon.png'):
            continue
        if os.path.getsize(os.path.join(ROOT, rel)) < MIN_BYTES:
            continue
        result = convert(rel)
        if result:
            before += result[0]
            after += result[1]
            print(f'{rel_fwd}: {result[0] // 1024}K -> {result[1] // 1024}K')
    if before:
        print(f'Total: {before // 1024}K -> {after // 1024}K')
    else:
        print('Nothing to do.')


if __name__ == '__main__':
    sys.exit(main())

import os
import re

filepath = 'app/admin/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

lines = content.split('\n')
new_lines = []
for line in lines:
    if 'fetch(`https://translate.googleapis.com' in line:
        new_lines.append(line)
        continue
    if 'await fetch(' in line:
        line = line.replace('await fetch(', 'await fetchWithAuth(')
    elif 'fetch(' in line and 'io(' not in line and 'fetchWithAuth' not in line and 'fetchData' not in line:
        if 'fetch(`${apiUrl}' in line:
            line = line.replace('fetch(', 'fetchWithAuth(')
    new_lines.append(line)

with open(filepath, 'w') as f:
    f.write('\n'.join(new_lines))

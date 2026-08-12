import re

file_path = "app/admin/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Backgrounds
content = content.replace("bg-slate-950", "bg-emerald-950")
content = content.replace("bg-slate-900", "bg-emerald-950")
content = content.replace("bg-slate-800", "bg-emerald-900")
content = content.replace("bg-slate-700", "bg-emerald-800")

# Borders
content = content.replace("border-slate-800", "border-emerald-800")
content = content.replace("border-slate-700", "border-emerald-700")
content = content.replace("border-slate-600", "border-emerald-600")

# Text
content = content.replace("text-slate-400", "text-emerald-300/70")
content = content.replace("text-slate-300", "text-emerald-100/90")
content = content.replace("text-slate-500", "text-emerald-400/80")
content = content.replace("text-indigo-400", "text-amber-400/80")

# Gradients (Buttons, headers)
content = content.replace("from-indigo-600", "from-emerald-600")
content = content.replace("to-indigo-900", "to-emerald-900")
content = content.replace("via-indigo-800", "via-emerald-800")
content = content.replace("from-blue-600", "from-emerald-500")
content = content.replace("to-indigo-700", "to-emerald-700")

# Hovers
content = content.replace("hover:bg-slate-800", "hover:bg-emerald-800/80")
content = content.replace("hover:bg-slate-700", "hover:bg-emerald-700")
content = content.replace("hover:text-indigo-400", "hover:text-amber-400")

# Active states
content = content.replace("bg-indigo-600", "bg-emerald-600")
content = content.replace("bg-blue-600", "bg-emerald-600")
content = content.replace("text-blue-500", "text-emerald-500")
content = content.replace("ring-blue-500", "ring-emerald-500")

# Sidebar active state (if any specific)
content = content.replace("bg-indigo-600/20", "bg-emerald-500/20")
content = content.replace("border-indigo-500", "border-emerald-500")
content = content.replace("text-indigo-500", "text-emerald-400")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Emerald theme applied to admin page!")

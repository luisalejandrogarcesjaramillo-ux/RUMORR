# ⚡ RUMORR MVP — Command Reference

Copy-paste commands to save time. All commands run from `c:\Users\assi\Desktop\RUMORR`.

---

## 🚀 **Development**

### Start dev server (if not running)
```powershell
npm run dev
```
**Output:** `ready started server on 0.0.0.0:3000, url: http://localhost:3000`  
**Action:** Open http://localhost:3000 in browser

---

### Stop dev server
```powershell
# Press Ctrl+C in terminal
```

---

### Rebuild (if needed)
```powershell
npm run build
```
**Output:** `.next` folder created (production build)

---

### Run production server locally
```powershell
npm run start
```
**Output:** Server at http://localhost:3000 (production mode)

---

## 📝 **Git Workflow**

### Check status
```powershell
git status
```
**Output:** Shows modified/new files

---

### Stage all changes
```powershell
git add .
```

---

### Commit with message
```powershell
git commit -m "H1: Add 3D model and lighting"
```

---

### Push to GitHub
```powershell
git push origin main
```
**Note:** First time? Do `git push --set-upstream origin main`

---

### View recent commits
```powershell
git log --oneline -5
```
**Output:** Last 5 commits

---

## 🔍 **Debugging**

### Check for TypeScript errors
```powershell
npx tsc --noEmit
```
**Output:** List of type errors (if any)

---

### Lint code
```powershell
npm run lint
```
**Output:** ESLint warnings/errors

---

### View current branch
```powershell
git branch
```
**Output:** Current branch (usually `main`)

---

## 📊 **Data / Leads**

### View captured leads (JSON)
```powershell
cat data/leads.json
```
**Output:** Pretty-printed JSON array of leads

---

### Count total leads
```powershell
(Get-Content data/leads.json | Measure-Object -Line).Lines
```
**Output:** Number of leads captured

---

### Export leads as CSV (manual)
1. Open `data/leads.json` in editor
2. Copy all content
3. Go to https://www.json2csv.com/
4. Paste JSON → Download CSV

---

## 🌐 **Vercel Deploy**

### Install Vercel CLI (one-time)
```powershell
npm i -g vercel
```

---

### Deploy to Vercel
```powershell
vercel
```
**Follow prompts:** Link to GitHub → Deploy

---

### View Vercel logs (after deploy)
```powershell
vercel logs [your-project-name]
```
**Output:** Live logs from Vercel

---

### Check current deployments
```powershell
vercel list
```
**Output:** All Vercel deployments for your account

---

## 🧹 **Cleanup**

### Clean node_modules (if stuck)
```powershell
rm -r node_modules package-lock.json ; npm install --legacy-peer-deps
```
**Warning:** Takes 2–3 min, only if needed

---

### Reset to fresh state
```powershell
git reset --hard HEAD
```
**Warning:** Deletes all unsaved changes. Use with caution.

---

## 📱 **Mobile Testing**

### Get your local IP (for mobile testing)
```powershell
ipconfig
```
**Look for:** IPv4 Address (e.g., 192.168.1.100)

---

### Access from phone
1. Phone on same WiFi as computer
2. Open phone browser
3. Go to `http://192.168.1.100:3000` (replace IP)

---

## 🛠️ **File Editing (from terminal)**

### Open file in editor
```powershell
code components/Scene.tsx
```
**Note:** Opens in VS Code (if installed)

---

### Edit file quickly (example)
```powershell
# View file
cat pages/index.tsx

# Edit with VS Code
code pages/index.tsx
```

---

## 📦 **Dependencies**

### Install single package
```powershell
npm install [package-name]
```
**Example:** `npm install framer-motion`

---

### Install dev dependency
```powershell
npm install --save-dev [package-name]
```

---

### Update all packages
```powershell
npm update
```
**Warning:** Can break things; commit first

---

### Check for outdated packages
```powershell
npm outdated
```
**Output:** Which packages have updates available

---

## 🚨 **Errors & Fixes**

### "Port 3000 already in use"
```powershell
# Kill process using port 3000
Get-Process | Where-Object {$_.Name -eq "node"} | Stop-Process -Force

# Or use different port
npm run dev -- -p 3001
```

---

### "Cannot find module X"
```powershell
# Reinstall dependencies
npm install --legacy-peer-deps
```

---

### "TypeScript error: Cannot find name 'process'"
**Fix:** Already in `tsconfig.json`. Run `npm install` if error persists.

---

### "Next.js build fails"
```powershell
# Clear cache
rm -r .next
npm run build
```

---

## ⏱️ **Time-Savers**

### Copy folder structure to clipboard
```powershell
tree /F /A > structure.txt
```
**Output:** `structure.txt` with full folder tree

---

### Kill all node processes (if stuck)
```powershell
taskkill /IM node.exe /F
```

---

### Open DevTools in Chrome
```
F12 or Right-click → Inspect
```
**Tabs:** Console (errors), Network (requests), Performance (FPS)

---

## 📚 **Reference URLs**

Keep these bookmarked:

- **Local dev:** http://localhost:3000
- **Vercel dashboard:** https://vercel.com/dashboard
- **GitHub repo:** https://github.com/[your-username]/rumorr-mvp
- **React Three Fiber docs:** https://docs.pmnd.rs/react-three-fiber
- **Tailwind playground:** https://play.tailwindcss.com

---

## ✨ **Pro Tip: Create Aliases**

Add to PowerShell profile (`$PROFILE`):
```powershell
Set-Alias -Name devstart -Value { npm run dev }
Set-Alias -Name devbuild -Value { npm run build }
Set-Alias -Name gitpush -Value { git add . ; git commit -m "auto"; git push }
```

Then use: `devstart` instead of `npm run dev` 🚀

---

**All set! Bookmark this page for quick reference during the sprint.**

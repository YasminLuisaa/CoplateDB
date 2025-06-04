Write-Host "Removing node_modules and cleaning cache..."
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue node_modules
Remove-Item -Force -ErrorAction SilentlyContinue package-lock.json

Write-Host "Installing dependencies..."
npm install --legacy-peer-deps

Write-Host "Starting development server..."
npm run dev

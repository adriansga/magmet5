@echo off
chcp 65001 >nul
cd /d "G:\Mój dysk\.AI PROJEKTY\Stronyai\MAGMET - FILIP KASPRZYK\Projekt7-qwen dynamica"

if not exist ".git" (
    git init
    git remote add origin https://github.com/adriansga/magmet5.git
) else (
    git remote set-url origin https://github.com/adriansga/magmet5.git
)

git branch -M main
git pull origin main --no-rebase 2>nul
git add .
git commit -m "Aktualizacja %date% %time%"
git push -u origin main
echo.
echo Gotowe! Strona zaktualizowana.
pause

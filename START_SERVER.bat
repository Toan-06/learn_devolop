@echo off
title Learn & Develop - SQL Server API Server
echo =======================================================
echo  Dang khoi dong SQL Server API Backend (Port 5000)...
echo =======================================================
cd /d "%~dp0"
node server/server.js
pause

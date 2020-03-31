REM This batch file is intended as the handler for demo files
REM Associate it with .dmo files using Folder Options in Control Panel
REM Double-clicking on a .dmo or asking your browser to open one
REM will then launch Sauerbraten and play it.

cd %~p0
sauerbraten.bat -x"demo ""%~p1%~n1"""




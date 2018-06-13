@ECHO OFF
SET dbpath="C:\Workspace\Databases\MongoDB\invest-app"
SET logpath="C:\Workspace\Databases\MongoDB\invest-app\log.txt"

SET args=--dbpath %dbpath% --logpath %logpath% --directoryperdb --bind_ip 127.0.0.1 --port 9999 -vvvvv

IF NOT EXIST "%dbpath%" MKDIR "%dbpath%"

REM echo %args%
C:\Workspace\Services\MongoDB\3.6.2\mongod.exe %args%

@ECHO OFF
SET dbpath="C:\\Workspace\\Databases\\MongoDB\\invest-app"
IF NOT EXIST "%dbpath%" MKDIR "%dbpath%"

C:\Workspace\Services\MongoDB\3.6.2\mongod.exe --config "C:\\Workspace\\Projects\\invest-app\\config\\mongod.conf"
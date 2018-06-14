@ECHO OFF
SET dbpath="C:\\Workspace\\Databases\\MongoDB\\geas-api"
IF NOT EXIST "%dbpath%" MKDIR "%dbpath%"

C:\Workspace\Services\MongoDB\3.6.2\mongod.exe --config "C:\\Workspace\\Projects\\GEAS\\api\\config\\mongod.conf"
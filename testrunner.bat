@echo off

set READY_API_HOME=%~dp0
set OLDDIR=%CD%
cd /d %READY_API_HOME%

if exist "%READY_API_HOME%..\jre\bin" goto SET_BUNDLED_JAVA
if exist "%JAVA_HOME%" goto SET_JAVA_HOME_JAVA
java -version 2> NUL
if not %ERRORLEVEL%==9009 goto SET_SYSTEM_JAVA
echo Java not found. Install it and set JAVA_HOME to the directory of your local Java installation to proceed.
goto END

:SET_BUNDLED_JAVA
set JAVA=%READY_API_HOME%..\jre\bin\java
goto END_SETTING_JAVA

:SET_JAVA_HOME_JAVA
set JAVA=%JAVA_HOME%\bin\java
goto END_SETTING_JAVA

:SET_SYSTEM_JAVA
echo JAVA_HOME is not set, unexpected results may occur.
echo Set JAVA_HOME to the directory of your local Java installation to avoid this message.
set JAVA=java
goto END_SETTING_JAVA

:END_SETTING_JAVA

set CLASSPATH=%READY_API_HOME%ready-api-ui-3.50.0.jar;%READY_API_HOME%..\lib\*
"%JAVA%" -cp "%CLASSPATH%" com.eviware.soapui.tools.JfxrtLocator > %TEMP%\jfxrtpath
set /P JFXRTPATH= < %TEMP%\jfxrtpath
del %TEMP%\jfxrtpath

"%JAVA%" -cp "%CLASSPATH%" com.eviware.soapui.tools.XmxCalculator > %TEMP%\readyxmx
set /P READY_XMX= < %TEMP%\readyxmx
del %TEMP%\readyxmx
rem uncomment to override memory limit
rem set READY_XMX=4000m

set CLASSPATH=%JFXRTPATH%%CLASSPATH%

rem JVM parameters, modify as appropriate
set JAVA_OPTS=-Xms128m -Xmx%READY_XMX% -Dtest.history.disabled=true -Dsoapui.properties=soapui.properties -Dgroovy.source.encoding=iso-8859-1 "-Dsoapui.home=%READY_API_HOME%\"

rem CVE-2021-44228
set JAVA_OPTS=%JAVA_OPTS% -Dlog4j2.formatMsgNoLookups=true

rem JAVA 17
set JAVA_OPTS=%JAVA_OPTS% --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.invoke=ALL-UNNAMED --add-opens java.desktop/java.beans=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens java.base/java.util.concurrent.atomic=ALL-UNNAMED --add-opens java.xml/com.sun.org.apache.xerces.internal.util=ALL-UNNAMED --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.net=ALL-UNNAMED --add-opens java.desktop/java.awt=ALL-UNNAMED --add-opens java.desktop/javax.swing=ALL-UNNAMED --add-opens java.base/sun.net.www=ALL-UNNAMED --add-opens java.base/sun.net.www.protocol.https=ALL-UNNAMED --add-opens java.base/sun.net.www.protocol.http=ALL-UNNAMED --add-opens java.desktop/javax.swing.plaf=ALL-UNNAMED --add-opens java.desktop/javax.swing.plaf.basic=ALL-UNNAMED --add-opens jdk.jdi/com.sun.jdi=ALL-UNNAMED --add-opens java.prefs/java.util.prefs=ALL-UNNAMED

if "%READY_API_HOME%\" == "" goto START
    set JAVA_OPTS=%JAVA_OPTS% -Dsoapui.ext.libraries="%READY_API_HOME%ext"
    set JAVA_OPTS=%JAVA_OPTS% -Dsoapui.ext.listeners="%READY_API_HOME%listeners"
    set JAVA_OPTS=%JAVA_OPTS% -Dsoapui.ext.actions="%READY_API_HOME%actions"

:START

rem ********* run soapui testcase runner ***********

"%JAVA%" %JAVA_OPTS% -cp "%CLASSPATH%" com.smartbear.ready.cmd.runner.pro.SoapUIProTestCaseRunner %*

:END

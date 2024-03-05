function LaunchURL(strEnvironment)
{
  try{
  let browser = Project.Variables.browser
  if (Sys.WaitBrowser(browser).Exists)       
    {
      Sys.Browser(browser).Close()
    }
  switch (strEnvironment){
    case "QALATEST":
      URL = "https://qalatest.cmicpaas.com/cmiclaunch//cmiclaunch_R12.html";
      break;
    case "QADAILY":
    case "QADAILY2":
      URL = "https://qa.cmicpaas.com/cmiclaunch/cmiclaunch_R12.html";
      break;
  }
  Browsers.Item(browser).Run(URL)
  }
  catch(err)
  {
    Log.Error("Exception: LaunchURL: "+err.description);
  }
}

function Login(strEnvironment)
{
  try{
    switch (strEnvironment){
    case "QALATEST":
      UserName = "raman";
      Password = "raman1";
      break;
    case "QADAILY":
      UserName = "raman2";
      Password = "raman2";
      break;
    case "QADAILY2":
      UserName = "raman2";
      Password = "raman2";
      break;
    }
  Aliases.Browser.pageSignIn.TextBoxUsername.SetText(UserName)
  aqUtils.Delay(3000,"Wait for page to load")
  Aliases.Browser.pageSignIn.TextBoxPassword.SetText(Password)
  Aliases.Browser.pageSignIn.BtnSubmit.Click()
  aqUtils.Delay(5000,"Wait for page to load")
  }
  catch(err)
  {
    Log.Error("Exception: Login: "+err.description);
  }
}

function CloseBrowser(URL)
{
  Sys.Browser(Project.Variables.browser).Close()
}

//#########################################################################################################################################################*/
function getPage()
   {
     return Sys.Browser(Project.Variables.browser).Page("*")  
   } 

//#########################################################################################################################################################*/
function WaitObjLoad(objUI)
{
  var iCount = 0;
  var objCurrentPage;
  Log.Enabled = false;
  objCurrentPage = getPage()
  if(!objCurrentPage.Exists)
  {
    objCurrentPage = getPage()
    objCurrentPage.Wait()
  }
  while(iCount<40)
  {
    if(objUI.Exists == false || objUI.Enabled == false)
    {
      Delay(500,"Waiting for Object to Load");
      iCount = iCount+1;
      objCurrentPage = getPage()
      if(!objCurrentPage.Exists)
      {
        objCurrentPage.Wait()
      }
    }
    else
      break;
  }
  Log.Enabled = true;
}
/*#######################################################################################################################################################*/



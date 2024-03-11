//USEUNIT CommonFunctions

function SelectProjectFromUI()
{
  try{
    CommonFunctions.LaunchURL(Project.Variables.Environment)
//----------------------------------------------------------------- 
    Aliases.Browser.PgeCmicR12LaunchPage.LnkProjectManagement.Click()
    ObjEnvironmentPanel = Aliases.Browser.PgeCmicR12LaunchPage.PnlSelectAnEnvironment
    StrEnv = Project.Variables.Environment[0].toUpperCase() + Project.Variables.Environment.slice(1).toLowerCase()
    ObjEnvironmentPanel.FindChildByXPath("//a[text()='"+StrEnv+"']").Click()
    Aliases.Browser.PgeCmicR12LaunchPage.BtnLaunchSoftware.Click()
    getPage().Wait()
//------------------------------------------------------------------  
    CommonFunctions.Login(Project.Variables.Environment)
//-----------------------------------------------------------------
    var folderPath = aqFileSystem.ExcludeTrailingBackSlash(ProjectSuite.Path)
    folderPath =  aqFileSystem.GetFileFolder(folderPath)
    var filePath = folderPath + "TestData\\ProjectDetails.txt";
    var file = Sys.OleObject("Scripting.FileSystemObject").OpenTextFile(filePath, 1); // 1 for reading
    var fileContent = file.ReadLine();
    strProjectName = aqString.Unquote(fileContent)
//-----------------------------------------------------------------
    objProjectTxtBox = Aliases.Browser.PgeProjectManagement.frameTreeframe.TextBoxSearchProject
    WaitObjLoad(objProjectTxtBox)
    if ((objProjectTxtBox.Text).includes(strProjectName)){
      Log.Message("Project '" + strProjectName +"' already selected")
    }
    else{
      objProjectTxtBox.Click()
      objProjectSearchTbl = Aliases.Browser.PgeProjectManagement.frameTreeframe
      WaitObjLoad(objProjectSearchTbl)
      objProject = objProjectSearchTbl.FindChildByXPath("//td[text() ='"+ strProjectName +"']") 
      objProject.Click() 
      Log.Message("Selected the project" + strProjectName)    
    }
    CommonFunctions.CloseBrowser()
  }
//-----------------------------------------------------------------
  catch(err)
  {
    Log.Warning("Exception: Error occured while choosing project "+err.description);
  }
}


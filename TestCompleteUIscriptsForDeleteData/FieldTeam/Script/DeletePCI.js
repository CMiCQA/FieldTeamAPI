//USEUNIT CommonFunctions

function DeletePCI()
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
//------------------------------------------------------------------ 
  if (Aliases.Browser.PgeProjectManagement.frameTreeframe.LnkPCI.VisibleOnScreen == false){
      Aliases.Browser.PgeProjectManagement.frameTreeframe.LblBudgetAndCostManagement.Click()
      }
    Aliases.Browser.PgeProjectManagement.frameTreeframe.LnkPCI.Click()
//-----------------------------------------------------------------
    var folderPath = aqFileSystem.ExcludeTrailingBackSlash(ProjectSuite.Path)
    folderPath =  aqFileSystem.GetFileFolder(folderPath)
    var filePath = folderPath  + "\\TestData\\DataTransfer\\PCIDataTransfer.txt";
    var file = Sys.OleObject("Scripting.FileSystemObject").OpenTextFile(filePath, 1); // 1 for reading
    var fileContent = file.ReadLine();
    PCICode = aqString.Unquote(fileContent)
//-----------------------------------------------------------------
    Aliases.Browser.PgeProjectManagement.frameContentframe.TxtBoxSeachSC.SetText(PCICode)
    Sys.Keys("[Enter]")
    objTblSearchResultsSC = Aliases.Browser.PgeProjectManagement.frameContentframe.TblSearchResultsSC
    WaitObjLoad(objTblSearchResultsSC)
    objContractCode = objTblSearchResultsSC.FindChildByXPath("//td[contains(text(),'"+PCICode+"')]")
    objContractCode.Click()
//-----------------------------------------------------------------
    Aliases.Browser.PgeProjectManagement.frameHeaderframe.BtnDeleteAll.Click()
    Aliases.Browser.PgeProjectManagement.frameContentframe.BtnYes.Click()
//-----------------------------------------------------------------
    Log.Message("Deleted the record" + PCICode)
    CommonFunctions.CloseBrowser()
  }
//-----------------------------------------------------------------
  catch(err)
  {
    Log.Warning("Exception: Error occured while deleting SubContract "+err.description);
  }
}


﻿//USEUNIT CommonFunctions

function DeleteSubContracts()
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
  WaitObjLoad(Aliases.Browser.PgeProjectManagement.frameTreeframe.LnkSubContract)
  if (Aliases.Browser.PgeProjectManagement.frameTreeframe.LnkSubContract.VisibleOnScreen == false){
      Aliases.Browser.PgeProjectManagement.frameTreeframe.LblBudgetAndCostManagement.Click()
      }
    Aliases.Browser.PgeProjectManagement.frameTreeframe.LnkSubContract.Click()
//-----------------------------------------------------------------
    var folderPath = aqFileSystem.ExcludeTrailingBackSlash(ProjectSuite.Path)
    folderPath =  aqFileSystem.GetFileFolder(folderPath)
    var filePath = folderPath + "\\TestData\\DataTransfer\\SubContractsDataTransfer.txt";
    var file = Sys.OleObject("Scripting.FileSystemObject").OpenTextFile(filePath, 1); // 1 for reading
    var fileContent = file.ReadLine();
    ContractCode = aqString.Unquote(fileContent)
//-----------------------------------------------------------------
    objTextBoxSearchSC = Aliases.Browser.PgeProjectManagement.frameContentframe.TxtBoxSeachSC
    WaitObjLoad(objTextBoxSearchSC)
    objTextBoxSearchSC.SetText(ContractCode)
    Sys.Keys("[Enter]")
    Delay(3000)
    objTblSearchResultsSC = Aliases.Browser.PgeProjectManagement.frameContentframe.TblSearchResultsSC
    objContractCode = objTblSearchResultsSC.FindChildByXPath("//td[contains(text(),'"+ContractCode+"')]")
    WaitObjLoad(objContractCode)
    objContractCode.Click()
//-----------------------------------------------------------------
    Aliases.Browser.PgeProjectManagement.frameHeaderframe.BtnDelete.Click()
    Aliases.Browser.PgeProjectManagement.Confirm.Button("OK").Click()
//-----------------------------------------------------------------
    Log.Message("Deleted the record" + ContractCode)
    CommonFunctions.CloseBrowser()
  }
//-----------------------------------------------------------------
  catch(err)
  {
    Log.Error("Exception: Error occured while deleting SubContract "+err.description);
  }
}
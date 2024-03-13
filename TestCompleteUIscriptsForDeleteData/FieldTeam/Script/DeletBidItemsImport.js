﻿//USEUNIT CommonFunctions

//@BidItemsImport @FieldTeam
function DeleteBidItemsImport()
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
  if (Aliases.Browser.PgeProjectManagement.frameTreeframe.LblBidItems.VisibleOnScreen == false){
      Aliases.Browser.PgeProjectManagement.frameTreeframe.PnlBidManagement.Click()
      }
    Aliases.Browser.PgeProjectManagement.frameTreeframe.LblBidItems.Click()
    Aliases.Browser.PgeProjectManagement.frameHeaderframe.LnkNavArrow.Click()
    Aliases.Browser.PgeProjectManagement.frameHeaderframe.BtnShowimporteddata.Click()
//    Aliases.Browser.PgeShowImportedData.ChkBoxShowCurrentProj.Click()
//-----------------------------------------------------------------
    var folderPath = aqFileSystem.ExcludeTrailingBackSlash(ProjectSuite.Path)
    folderPath =  aqFileSystem.GetFileFolder(folderPath)
    var filePath = folderPath + "TestData\\DataTransfer\\BidItemsDataTransfer.txt";
    var file = Sys.OleObject("Scripting.FileSystemObject").OpenTextFile(filePath, 1); // 1 for reading
    var fileContent = file.ReadLine();
    ItemName = aqString.Unquote(fileContent)

    objPnlCsvUploadRequestForm = Aliases.Browser.PgeShowImportedData.PnlCsvUploadRequestForm
    WaitObjLoad(objPnlCsvUploadRequestForm)
    objItemName = objPnlCsvUploadRequestForm.FindChildByXPath("//input[@value='"+ ItemName +"']//ancestor::td")
    RowNum = objItemName.RowIndex
    objCell = objPnlCsvUploadRequestForm.FindChild("Name","Cell("+RowNum+", 0)",30)
    objCheckBox = objCell.FindChild("ObjectType","checkbox")
    objCheckBox.Click()
//-----------------------------------------------------------------
    Aliases.Browser.PgeShowImportedData.BtnReValidate.Click()
    Aliases.Browser.PgeShowImportedData.Confirm.buttonOk.Click()
//------------------------------------------------------------------
    Log.Message("Deleted the record" + ItemName)
    CommonFunctions.CloseBrowser()
  }
//-----------------------------------------------------------------
  catch(err)
  {
    Log.Warning("Exception: Error occured while deleting Bid Item Import "+err.description);
  }
}


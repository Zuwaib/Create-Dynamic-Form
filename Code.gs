var SSID = '1KCP3L1AZj-ZkHl3EZw4tGOKujsy748plTjqA8Xb-0Ig';
var dataSheetName = 'Copy of Sales Quote';
//var imgUrl = 'https://info.printfleet.com/hs-fs/hubfs/Icons/demo.jpg';
function createForm() {
  var ss = SpreadsheetApp.openById(SSID);
  var ssFormUrl = ss.getFormUrl();
  if(!ssFormUrl){
    var sheet = ss.getSheetByName(dataSheetName);
    var data = sheet.getRange(28, 4, sheet.getLastRow() - 27, sheet.getLastColumn() - 3).getValues()
                .filter(function(item){
                  if(item[1].toLowerCase() === 'dahua')
                    return item;
                });

    //create form
    var form = FormApp.create('Demo Form');
    
    for(var i = 0; i < data.length; i++){
      var item = data[i];
      var baseUrl = 'https://chart.googleapis.com/chart?chst=d_bubble_texts_big&chld=';
      var parameters = 'bbT|FFFF88|000000|'
      parameters += item[0] + ' - ' + item[1] + '|';
      parameters += item[22] + ' - ' + item[79] + ' - ' + item[27] + '|';
      parameters += item[81] + ' - ' + item[82] + '|';
      parameters += item[237] + ' - ' + item[238] + ' - ' + item[239] + ' - ' + item[240];
      
      var imgUrl = baseUrl + encodeURIComponent(parameters);
      Logger.log(imgUrl);
      
      var img = UrlFetchApp.fetch(imgUrl);
      form.addImageItem()
          .setImage(img);
      var q = form.addCheckboxItem();
      q.setTitle(item[0])
          .setChoices([
                q.createChoice('Quote Price'),
                q.createChoice('Ask for feedback'),
                q.createChoice('Ask if of interest'),
                q.createChoice('Get updated price')
          ]);
    }
    //set form destination
    form.setDestination(FormApp.DestinationType.SPREADSHEET, SSID);
    Logger.log('Script completed');
    
    
    
//  
//    //add first question with image in help-text
//    
//    
//    
//    var img = UrlFetchApp.fetch(imgUrl);
//    form.addImageItem()
//        .setTitle('Demo Title')
//        .setImage(img);
//    
//    //add first multiple choice type question
//    var q1 = form.addMultipleChoiceItem();
//    q1//.setTitle('Please select top first skill')
//      .setChoices([
//        q1.createChoice('Demo1'),
//        q1.createChoice('Demo2')
//      ])
//      .showOtherOption(true)
//      
//    //add second multiple choice type question
//    var q2 = form.addMultipleChoiceItem();
//    q2.setTitle('Please select top second skill')
//      .setChoices([
//        q2.createChoice('Demo3'),
//        q2.createChoice('Demo4')
//      ])
//      .showOtherOption(true)
//      .setRequired(true);
//      
//    //set form destination
//    form.setDestination(FormApp.DestinationType.SPREADSHEET, SSID);
  }
}

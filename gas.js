function doPost(e) {
  // スプレッドシートを取得
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  // 送られてきたデータを解析
  var data = JSON.parse(e.postData.contents);
  
  // 新しい行を追加（日時, 教科, メモ, 秒数, 時間）
  sheet.appendRow([
    new Date(), 
    data.subject, 
    data.memo, 
    data.seconds, 
    data.formattedTime
  ]);
  
  // 完了の返事
  return ContentService.createTextOutput("Success");
}

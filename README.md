# study(ja)
googleスプレッドシートとの連携方法
ステップ1：スプレッドシートの準備
新規スプレッドシートを作成し、1行目に項目名を書きます。
A列：日付 / B列：教科 / C列：一言 / D列：時間
メニューの「拡張機能」→「Apps Script」を開きます。

ステップ2：GASコードの記述
開いたエディタにあるコードを削除し、以下のコードを貼り付けて保存し、「デプロイ」→「新しいデプロイ」→「ウェブアプリ」として公開します。
注意: アクセスできるユーザーを「全員」にする必要があります。(次の〜ユーザ→自分に選択する必要があります)
ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // スプレッドシートに追記 [日付, 教科, 時間, 一言]
  sheet.appendRow([new Date(), params.subject, params.time, params.memo]);
  
  return ContentService.createTextOutput(JSON.stringify({status: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}

# study(ja)
You need google account to access google spledsheets.
ステップ1：スプレッドシートの準備
新規スプレッドシートを作成し、1行目に項目名を書きます。

A列：日付 / B列：教科 / C列：時間 / D列：一言

メニューの「拡張機能」→「Apps Script」を開きます。

ステップ2：GASコードの記述
開いたエディタに以下のコードを貼り付けて保存し、「デプロイ」→「新しいデプロイ」→「ウェブアプリ」として公開します。

注意: アクセスできるユーザーを「全員」にする必要があります。

JavaScript

function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // スプレッドシートに追記 [日付, 教科, 時間, 一言]
  sheet.appendRow([new Date(), params.subject, params.time, params.memo]);
  
  return ContentService.createTextOutput(JSON.stringify({status: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
ステップ3：タイマー画面（HTML/JS）
以下のようなシンプルなインターフェースを作成します。

タイマー機能: setInterval を使って秒数をカウント。

データ送信: fetch を使ってGASのURLへデータを飛ばす。

HTML

<div>
  <input type="text" id="subject" placeholder="教科（例：数学）">
  <input type="text" id="memo" placeholder="一言（例：集中できた！）">
  <div id="display">00:00:00</div>
  <button onclick="startTimer()">スタート</button>
  <button onclick="stopAndSave()">終了して保存</button>
</div>

<script>
  let seconds = 0;
  let timer;

  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      document.getElementById('display').innerText = new Date(seconds * 1000).toISOString().substr(11, 8);
    }, 1000);
  }

  async function stopAndSave() {
    clearInterval(timer);
    const data = {
      subject: document.getElementById('subject').value,
      memo: document.getElementById('memo').value,
      time: document.getElementById('display').innerText
    };
    
    // GASのURLに送信
    await fetch('あなたのGASのURL', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    alert('記録しました！');
  }
</script>

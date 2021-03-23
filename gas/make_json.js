
//データ取得
function getData() {
    //データ取得するシート（現在開いているシートを指定）
    var sheet = SpreadsheetApp.getActiveSheet();

    //行（横軸）と列（縦軸）の最大数を取得
    var maxRow = sheet.getLastRow();
    var maxColumn = sheet.getLastColumn();

    //JSON用のkey
    var keys = [];

    //データ格納配列
    var data = [];

    //8行目のkeyの名前取得
    for (var x = 1; x <= maxColumn; x++) {
        keys.push(sheet.getRange(8, x).getValue());
    }

    //  データ内容取得
    var val = sheet.getRange(15, 1, maxRow - 14, maxColumn).getValues()

    //データ挿入
    for (var y = 15; y <= maxRow; y++) {
        var json = {};
        for (var x = 1; x <= maxColumn; x++) {
            var Valuetmp = val[y - 15][x - 1];
            if (Valuetmp == "NULL") {
                Valuetmp = null;
            } else if (Valuetmp == "null") {
                Valuetmp = null;
            } else if (Valuetmp == "TRUE") {
                Valuetmp = true;
            } else if (Valuetmp == "FALSE") {
                Valuetmp = false;
            } else if (toString.call(Valuetmp) == "[object Date]") {
                Valuetmp = Valuetmp.toLocaleString();
            } else if (toString.call(Valuetmp) == "[object String]") {
                if (val[y - 15][x - 1].slice(0, 1) == "[") {
                    Valuetmp = JSON.parse(Valuetmp)
                }
                if (val[y - 15][x - 1].slice(0, 2) == "[]") {
                    Valuetmp = JSON.parse(Valuetmp)
                }
            }
            json[keys[x - 1]] = Valuetmp;
        }

        //データ格納
        data.push(json);
    }

    console.log(data);
    //整形してテキストにします
    // return JSON.stringify(data);  
    return JSON.stringify(data, null, '\t');
}


//スプレッドシート読み込み時に実行
function onOpen() {
    //メニューバーにJSON出力用メニューを追加
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var entries = [{
        name: "JSONで出力",
        functionName: "toJSON"
    }];
    spreadsheet.addMenu("JSON", entries);
};

//名前つけ関数
function name() {
    var spread = SpreadsheetApp.getActiveSpreadsheet();
    var name = spread.getActiveSheet().getRange(3, 2).getValue();
    return name;
}

//ダウンロードダイヤログ表示
function toJSON() {
    //ダイヤログテンプレート読み込み
    var dl_html = HtmlService.createTemplateFromFile("dl_dialog").evaluate();

    //ダイヤログ表示
    SpreadsheetApp.getUi().showModalDialog(dl_html, "JSONファイルをダウンロード");
}




function createJson() {
    var cordArr = [];
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh_cnt = ss.getNumSheets();
    for (var i = 2; i < sh_cnt; i++) {
        ss.getSheets()[i].activate();
        var JsonData = getData();
        writeDrive(JsonData, "json");
    }
}


function writeDrive(data, fileType) {
    var drive = DriveApp.getFolderById('1s_vDXCXhHJj80e4fguC44rXuqy8eZwz7');
    var fileName = SpreadsheetApp.getActiveSheet().getRange(3, 2).getValue() + '.' + fileType;
    if (fileType == "json") {
        var contentType = 'application/json';
    } else {
        var contentType = 'text/javascript';
        fileName = "Masta.php";
    }
    var charset = 'utf-8';
    var blob = Utilities.newBlob(data, contentType, fileName);
    drive.createFile(blob);
}

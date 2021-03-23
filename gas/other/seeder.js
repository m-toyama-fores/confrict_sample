function repeat() {
    var spread = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spread.getActiveSheet();
    var acSheetName = sheet.getName();
    var arrSS = [];
    var arr = [];

    var ss_count = spread.getNumSheets();
    for (var i = 0; i < spread.getSheets().length; i++) {
        var test = spread.getSheets()[i].getName();
        //    シート名を配列に
        arrSS.push(test);
    }

    var SheetName = arrSS.join("-").split(acSheetName)[1];
    var SheetNames = SheetName.split("-");
    for (var i = 1; i < SheetNames.length; i++) {
        var actionSheet = spread.getSheetByName(SheetNames[i]);
        actionSheet.activate();
        var tmp = Toseeder(actionSheet);
        arr.push(tmp);
    }
    var sheet = spread.getSheetByName("hyouzi");
    for (var i = 1; i < arr.length; i++) {
        sheet.getRange(i, 1).setValue(arr[i - 1]);
    }
}



function Toseeder(sheet) {

    //  var spread = SpreadsheetApp.getActiveSpreadsheet();
    //  var sheet = spread.getActiveSheet();

    //  タイトルを付けて改行して元の値を代入
    var arr = [];
    var activecell_tmp = sheet.getRange(8, 1).getValue();
    sheet.getRange(8, 1).activate();

    //  右隣を確かめて空欄じゃない時処理をする
    for (let i = 0; activecell_tmp != ''; i++) {
        activecell_tmp = sheet.getActiveCell().offset(0, i).getValue();
        //    console.log(activecell_tmp);
        if (activecell_tmp == '') {
            break;
        }
        if (sheet.getActiveCell().offset(0, i + 1).getValue() != "") {
            var setRecored = "                    '" + activecell_tmp + "'=> $array['" + activecell_tmp + "'],"
        } else {
            var setRecored = "                    '" + activecell_tmp + "'=> $array['" + activecell_tmp + "']"
        }



        arr.push(setRecored);
    }
    arr.join('\n');
    //  sheet.getRange(1, 2).setValue(arr.join('\n'));

    //  タイトルを付けて改行して元の値を代入
    var table_name = sheet.getRange(3, 2).getValue();
    var setvalue = "        $url = public_path() . '/data/" + table_name + ".json';\n        $json = file_get_contents($url);\n        $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');\n        $arrays = json_decode($json,true);\n        foreach ($arrays as $array) {\n            DB::table('" + table_name + "')->insert(\n            [\n                [\n" + arr.join('\n') + "\n                ],\n            ]);\n        }"


    //  console.log(setvalue);
    return setvalue
}

function oneSheet() {
    var spread = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spread.getActiveSheet();
    var tmp = Toseeder(sheet);
    sheet.getRange(4, 16).setValue(tmp);
}

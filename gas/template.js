function getVal(spreadId, name) {
    var spread = SpreadsheetApp.openById(spreadId)
    var sheet = spread.getSheetByName(name)
    var lastR = sheet.getLastRow()
    var lastC = sheet.getLastColumn()

    var values = sheet.getRange(15, 1, lastR - 14, lastC).getValues()
    return values

}

function setVal(spreadId, name, values) {
    var spread = SpreadsheetApp.openById(spreadId)
    var sheet = spread.getSheetByName(name)
    var lastR = sheet.getLastRow()
    var lastC = sheet.getLastColumn()

    sheet.getRange(15, 1, lastR - 14, lastC).setValues(values)
}



function teamCreate() {
    var user = getVal("10sgzy_lRV2GToy5VYyZkqmhGoHYHEwqBu2bFAUE1ziU", "社員")
    var result = getVal(id, "データ")

    for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < user.length; j++) {
            if (result[i][4] == user[j][0]) {
                result[i][5] = user[j][8]
            }
        }
    }
    setVal(id, "訪問結果", result)
}

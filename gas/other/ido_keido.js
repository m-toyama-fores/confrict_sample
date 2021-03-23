function activeTempido() {
    var val = SpreadsheetApp.getActiveRange().getValues()

    for (var i = 0; i < val.length; i++) {
        var activecell_tmp = val[i][0];
        var
            geocoder = Maps.newGeocoder() // Creates a new Geocoder object.
            , geocoder = geocoder.setLanguage('ja') // Use Japanese
            , response = geocoder.geocode(activecell_tmp).results[0]; // ets the approximate geographic points for a given address.
        val[i][1] = response.geometry.location.lat;
        val[i][2] = response.geometry.location.lng;
    }
    console.log(val)
    SpreadsheetApp.getActiveRange().setValues(val)
}
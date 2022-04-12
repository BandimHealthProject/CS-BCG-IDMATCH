/**
 * Responsible for rendering the ID match landing page
 */
'use strict';

var dataEntry;
function display() {
    
    doSanityCheck();
    loadData();
}

function loadData() {
    // SQL to check if data exsist already
    var sql = "SELECT _id FROM IDMATCH";
    dataEntry = [];
    console.log("Querying database for dataEntry...");
    console.log(sql);
    var successFn = function( result ) {
        console.log("Found " + result.getCount() + " dataEntry");
        for (var row = 0; row < result.getCount(); row++) {
            var rowId = result.getData(row,"_id"); // row ID 

            var p = {type: 'entry', rowId};
            dataEntry.push(p);
        }
        console.log("dataEntry:", dataEntry)
        initButtons();
        return;
    }
    var failureFn = function( errorMsg ) {
        console.error('Failed to get dataEntry from database: ' + errorMsg);
        console.error('Trying to execute the following SQL:');
        console.error(sql);
        alert("Program error Unable to look up dataEntry.");
    }
    odkData.arbitraryQuery('IDMATCH', sql, null, null, null, successFn, failureFn);
}

function doSanityCheck() {
    console.log("Checking things");
    console.log(odkData);
}

function initButtons() {
    var btnInc = $('#btnID');
    btnInc.on("click", function() {
        if (dataEntry.length != 0) {
            var rowId = dataEntry[0].rowId;
            odkTables.editRowWithSurvey(
                null,
                "IDMATCH",
                rowId,
                "IDMATCH",
                null
            );
        } else{
            odkTables.addRowWithSurvey(
                null,
                "IDMATCH",
                "IDMATCH",
                null,
                null
            );
        }
    });
    // Sync
    var btnSync = $('#btnSync');
    btnSync.on("click", function() {
        odkCommon.doAction(null, "org.opendatakit.services.sync.actions.activities.SyncActivity", {"componentPackage": "org.opendatakit.services", "componentActivity": "org.opendatakit.services.sync.actions.activities.SyncActivity"});   
    });
}
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friendData");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array

    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        //handle incoming servey results and compatibility logic
        var currentUser = req.body;
        //push new entry into friends array
        

        var totalDif = 40;
        var bestMatch;
        for (var i = 0; i < friendData.length; i++) {
          var currentDif = 0;
            for (var j = 0; j < 10; j++) {
                var dif = currentUser.scores[j] - friendData[i].scores[j];
                if (dif < 0) {
                    dif = dif * -1;
                }
                currentDif += dif;
            }
            if(currentDif<totalDif){
              totalDif = currentDif;
              bestMatch = friendData[i];
            }
        }

        friendData.push(currentUser);
        res.json(bestMatch);




    });



};
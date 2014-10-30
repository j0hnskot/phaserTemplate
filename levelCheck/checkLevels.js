function check() {
    var levels = 200;

    var request = null;
   


    for (var i = 1; i <= levels; i++) {
        
        request=getLevel(i);
        console.log("CURRENT FILE: " + i);

        JSON.parse(request);


    }

}

function getLevel(level) {


    var request = new XMLHttpRequest();


    request.open("GET", "./" + level + ".json", false);
    request.send(null)


    return (request.responseText);

}
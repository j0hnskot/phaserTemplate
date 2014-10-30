var fs = require('fs'),
    xml2js = require('xml2js');

// init the file parser
var parser = new xml2js.Parser({ explicitRoot: false, mergeAttrs: true, explicitArray: false });
// init the target directory
var targetDir = __dirname +  "/";
// check if a target directory was passed
targetDir += (process.argv.length > 2) ? process.argv[2] : '';
// check if a file filter was passed
var fileFilter = (process.argv.length > 3) ?process.argv[3] : null;

console.log('\nLooking for files in', targetDir);

if (fileFilter) console.log("... the names of which contain the string '"+fileFilter+"'\n");

var parseNextFile = function(files){

    if (files && files.length > 0)
    {
        // get the first file in the list
        var file = files.shift();
        // split off pure file name without format ending
        var fileName = file.substr(0, file.indexOf("."));
        // read the file
        fs.readFile(targetDir + file, function(err, data)
        {
            // parse the file's content
            parser.parseString(data, function(err, result)
            {
                // keep only the relevant information
                result.char = result.chars.char;
                delete result.chars;
                // turn it into a JSON string and write it into to a .json file with the same name as the XML
                fs.writeFile(targetDir + fileName + ".json", JSON.stringify(result), function(err) {
                    if (err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("Converted file", file, "to", fileName + ".json");
                        // parse the next file
                        parseNextFile(files);
                    }
                });
            });
        });
    }
    else
    {
        console.log("Conversion complete...\n");
    }
};


// check if the target directory exists
if (!fs.existsSync(targetDir))
{
    console.log(targetDir, "does not exist!");
}
else
{
    // read all files from the target directory
    var files = fs.readdirSync(targetDir);

    var n = files.length,
        i;
    for (i = n; --i >= 0;)
    {
        var file = files[i];
        var index = file.indexOf(".xml");
        // only process XML files that match the given filter
        if (index === -1 || (fileFilter && file.indexOf(fileFilter) === -1))
        {
            // delete the file entry
            files.splice(i, 1);
        }
    }
    if (!files || files.length === 0)
    {
        console.log("No files found!");
    }
    else
    {
        // parse all found files
        parseNextFile(files);
    }
}

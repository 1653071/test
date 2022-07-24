import * as fs from "fs";
import * as path from "path";
var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err)
            return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file)
                return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                }
                else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};
fs.readFile("opp.txt", "utf8", (err, data) => {
    var inpString = data.split("");
    console.log(data);
    let xorKey = 'P';
    let len = data.length;
    for (let i = 0; i < len; i++) {
        inpString[i] = (String.fromCharCode((inpString[i].charCodeAt(0)) ^ xorKey.charCodeAt(0)));
        process.stdout.write(inpString[i]);
    }
    return inpString.join("");
});
function encryptDecrypt(inpString) {
    fs.readFile("opp.txt", "utf8", (err, data) => {
        var inpString = data.split("");
        console.log(data);
        let xorKey = 'P';
        let len = data.length;
        for (let i = 0; i < len; i++) {
            inpString[i] = (String.fromCharCode((inpString[i].charCodeAt(0)) ^ xorKey.charCodeAt(0)));
            process.stdout.write(inpString[i]);
        }
        return inpString.join("");
    });
}
encryptDecrypt("!'5!'5");
//# sourceMappingURL=app.js.map
var fs = require('fs'),
    path = require('path'),
    childProcess = require("child_process"),
    exec = childProcess.exec;

module.exports = function(moduleName, version, targetDirectory, callback){
    var moduleDirectory = path.join(targetDirectory, moduleName + '_' + version);

    fs.exists(path.join(moduleDirectory), function(exists){
        if(!exists){
            fs.mkdirSync(moduleDirectory);
            fs.mkdirSync(path.join(moduleDirectory, 'node_modules'));
        }
        var modulePath = path.resolve(path.join(moduleDirectory, 'node_modules', moduleName));
        exec('npm --prefix ' + moduleDirectory + ' install ' + moduleName + '@"' + version + '"', function(error){
            if(error){
                callback(error);
                return;
            }
            callback(null, require(modulePath));
        });
    });
};
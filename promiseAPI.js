var fs = require('fs')


function pReadFile(filePath) {
    return new Promise(
        function (resolve, reject) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) reject(err);//把容器的pending状态改为rejected  
                resolve(data);//把容器的pending状态改为resolved
            });
        }
    )
}

module.exports = pReadFile
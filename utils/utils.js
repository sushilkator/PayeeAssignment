
var logger = require('./log-manager').getLogger();


function isEmpty(obj) {
    return (Object.keys(obj).length === 0);
}



module.exports.isEmpty = isEmpty;

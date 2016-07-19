//(function () {
//    console.log("wuu")
//    var old = console.log;
//    var logger = document.getElementById('log');
//    console.log = function (message) {
//        if (typeof message == 'object') {
//            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
//        } else {
//            logger.innerHTML += message + '<br />';
//        }
//    }
//})();

function mylog(message)
{
    console.log(message);
    var logger = document.getElementById('log');
    if (typeof message == 'object') {
        log.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
        log.innerHTML += message + '<br />';
    }
}
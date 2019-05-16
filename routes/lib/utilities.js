exports.sendData = function (req, res, data) {
    return res.status(200).json({
        success: true,
        data: data
    });
};
exports.sendError = function (req, res, prettyMsg, err) {
    return res.status(400).json({
        success: false,
        message: err.toString(),
        prettyMsg: prettyMsg,
        error: err.stack
    });
};

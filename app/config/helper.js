var helper = {};

// Show List View
helper.status = function(success, status_code,message, result, res) {
    res.json({success: success, status_code: status_code,message:message, result: result});
};

module.exports = helper;
'use strict';

module.exports = function(app) {
    require('./user-state-service')(app);
    require('./user-request-service')(app);
    require('./message-service')(app);
    require('./modal-service')(app);
    require('./image-service')(app);
    require('./as-served-service')(app);
    require('../../shared/services/http-request-interceptor')(app);
};
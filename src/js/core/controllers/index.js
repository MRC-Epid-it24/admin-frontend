/**
 * Created by Tim Osadchiy on 09/11/2016.
 */

'use strict';

module.exports = function(app) {
    require("./admin-controller")(app);
    require("./auth-controller")(app);
    require("./messages-controller")(app);
    require("./navigation-controller")(app);
};
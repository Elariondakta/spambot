"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: REGEX FOR ROUTE SELECTION
function default_1(req, res, next) {
    if (!req.cookies.userId && req.path != "/connect" && req.path != "/oauth" && !req.path.split("/").includes("ajax")) {
        //On exclu les chemins oauth et connect sinon on a des redirections infinies et ajax
        res.redirect("/connect");
    }
    else
        next();
}
exports.default = default_1;

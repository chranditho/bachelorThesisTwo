"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Status = void 0;
exports.model = model;
function model() {
    return 'model';
}
var Status;
(function (Status) {
    Status["Draft"] = "Draft";
    Status["Submitted"] = "Submitted";
    Status["InReview"] = "In Review";
    Status["Accepted"] = "Accepted";
    Status["Rejected"] = "Rejected";
    Status["Finished"] = "Finished";
})(Status || (exports.Status = Status = {}));
var UserRole;
(function (UserRole) {
    UserRole["User"] = "User";
    UserRole["Reviewer"] = "Reviewer";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=model.js.map
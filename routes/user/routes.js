module.exports = function (router) {
    router.get("/user/:id",require('./user').userInfo);
    router.get("/user/:id/:avatar",require('./user').avatarImg); 
     
};
const utils = require('../lib/utilities');
const  request = require('request');
const fs = require('fs');
let download = function(uri, filename, callback){
    
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  
  function userDetial(url){
    return new Promise((resolve,reject)=>{
        request(url, function (error, response, body) {
            if(error){
                reject({"status":"fail",'message': "User not found"});
                //utils.sendError(req, res, );
            }
            if(body){               
                let data = JSON.parse(body);
                resolve(data);
                //utils.sendData(req, res,  data);
            } else{
                reject({"status":"fail",'message': "User not found"});
            }
        });         
    });
 }
 
module.exports = {
    userInfo : async (req,res)=>{
        let userId = req.params.id;
        let url = `https://reqres.in/api/users/${userId}`;
        let data = await userDetial(url);
        utils.sendData(req, res,  data);
        
    },
    avatarImg : async(req,res)=>{
        let userId = req.params.id;
        let url = `https://reqres.in/api/users/${userId}`;
        let data = await userDetial(url);
        let avatarUrl = data.data.avatar;
        let extension = data.data.avatar.split('.').pop();
        console.log(data.data.avatar);  
        download(avatarUrl, ("avatar/user_"+userId+"."+extension), function(){
            console.log('done');
        });    
        request.get(avatarUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');                
                utils.sendData(req, res,  data);
            }
        });
    }
};
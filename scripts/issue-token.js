const TokenFarm = artifacts.require('TokenFarm');

module.exports = async function(callback) {
    let tokenFarm=await TokenFarm.deployed();
    try{
        // await tokenFarm.issueTokens();
       await tokenFarm.issueTokens()
       console.log("tokens issued");
    }catch(e){
        console.log(e.message);
    }
    
    
    callback();
  };
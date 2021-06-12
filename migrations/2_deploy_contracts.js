// const SimpleStorage = artifacts.require('./SimpleStorage.sol')
const DaiToken = artifacts.require('./DaiToken.sol')
const DappToken = artifacts.require('./DappToken.sol')
const TokenFarm = artifacts.require('./TokenFarm.sol')
module.exports = async function (deployer,network,accounts) {
  // deployer.deploy(SimpleStorage)
  await deployer.deploy(DaiToken);
  const daiToken=await DaiToken.deployed();

  await deployer.deploy(DappToken);
  const dappToken=await DappToken.deployed();

  await deployer.deploy(TokenFarm,daiToken.address,dappToken.address);
  const tokenFarm=await TokenFarm.deployed();

  await dappToken.transfer(tokenFarm.address,'1000000000000000000000000');
  console.log(accounts);
  await daiToken.transfer(accounts[1],'100000000000000000000')//100 token
}

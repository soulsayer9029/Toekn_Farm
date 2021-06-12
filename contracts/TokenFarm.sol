pragma solidity ^0.8.0;
import "./DaiToken.sol";
import "./DappToken.sol";



contract TokenFarm{

    string public name = "MyTokenFarm";
    DaiToken public Dai;
    DappToken public Dapp;
    address  public owner;
    

    mapping(address=> uint) public stakedBalance;
    mapping(address=> bool) public hasStaked;
    mapping(address=> bool) public isStaking;
    mapping(address=>uint)public dappBalance;
    address [] public investors;
    
    constructor(DaiToken _Dai,DappToken _Dapp) public{
        Dai=_Dai;
        Dapp=_Dapp;
        owner=msg.sender;
    }

    function stakeTokens(uint _amount) public{
        require(_amount>0,'amount cannot be 0');
        Dai.transferFrom(msg.sender,address(this),_amount);
        stakedBalance[msg.sender]+=_amount;
        
        if(!hasStaked[msg.sender]){
            investors.push(msg.sender);
        }
        hasStaked[msg.sender]=true;
        isStaking[msg.sender]=true;

    }
    function issueTokens()public{
        require(msg.sender == owner,'only owner can issue tokens');
        for(uint i=0;i<investors.length;i++){
            address investor=investors[i];
            uint principal=stakedBalance[investor];
            if(principal>0){
                Dapp.transfer(investor,principal);
                dappBalance[investor]+=principal;
            }
                
            
        }
    }

    function unstakeTokens() public{
        
        uint balance=stakedBalance[msg.sender];
        require(balance>0,'you have nothing to unstake');
        Dai.transfer(msg.sender,balance);
        stakedBalance[msg.sender]=0;
        
        
        hasStaked[msg.sender]=true;
        isStaking[msg.sender]=false;
        //investors.pop(msg.sender);

    }
}
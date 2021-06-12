import React from 'react'
import Link from 'next/link'
import Head from 'next';
import Web3Container from '../lib/Web3Container'
import 'bootstrap/dist/css/bootstrap.css'

interface IProps{
  web3:any,
  accounts: any[],
  daiToken:any,
  dappToken:any,
  tokenFarm:any,
  daiTokenBalance:string,
  dappTokenBalance:string,
  stakingBalance:string,
}
class Dapp extends React.Component<IProps> {
  state = {
    daiTokenBalance:this.props.daiTokenBalance,
    dappTokenBalance:this.props.dappTokenBalance,
    stakingBalance:this.props.stakingBalance,
    amount:'0'
  }

  // storeValue = async () => {
  //   const { accounts, contract } = this.props
  //   await contract.methods.set(5).send({ from: accounts[0] })
  //   alert('Stored 5 into account')
  // };

  // getValue = async () => {
  //   const { accounts, contract } = this.props
  //   const response = await contract.methods.get().call({ from: accounts[0] })
  //   this.setState({ balance: response })
  // };

  // getEthBalance = async () => {
  //   const { web3, accounts } = this.props
  //   const balanceInWei = await web3.eth.getBalance(accounts[0])
  //   this.setState({ ethBalance: balanceInWei / 1e18 })
  // };
  stakeTokens=(async()=>{
    const {accounts,daiToken,tokenFarm,dappToken}=this.props
    const {amount}=this.state;
    if(Number(amount)<0){
      alert("You must enter a valid amount")
      return
    }
    try{
      daiToken.methods.approve(tokenFarm._address,(amount)).send({from:accounts[0]}).on('transactionHash',()=>{
        tokenFarm.methods.stakeTokens(amount).send({from:accounts[0]}).on('transactionHash',(hash:any)=>{
          console.log(hash)
        })
      })
  
      let daiTokenBalance= await daiToken.methods.balanceOf(accounts[0]).call();
      this.setState({daiTokenBalance:daiTokenBalance.toString()})
      
      let dappTokenBalance= await dappToken.methods.balanceOf(accounts[0]).call();
      this.setState({dappTokenBalance:dappTokenBalance.toString()})
      
      let stakingBalance= await tokenFarm.methods.stakedBalance(accounts[0]).call();
      this.setState({stakingBalance:stakingBalance.toString()})
    }catch(e){
      alert("Some error occured,Check console")
      console.log(e)
    }
    
  })
  unstakeTokens=(async()=>{
    const {accounts,daiToken,tokenFarm,dappToken}=this.props
    try{
      tokenFarm.methods.unstakeTokens().send({ from: accounts[0] }).on('transactionHash', (hash:any) => {
        console.log(hash)
      })
      let daiTokenBalance= await daiToken.methods.balanceOf(accounts[0]).call();
      this.setState({daiTokenBalance:daiTokenBalance.toString()})
      
      let dappTokenBalance= await dappToken.methods.balanceOf(accounts[0]).call();
      this.setState({dappTokenBalance:dappTokenBalance.toString()})
      
      let stakingBalance= await tokenFarm.methods.stakedBalance(accounts[0]).call();
      this.setState({stakingBalance:stakingBalance.toString()})
    }catch(e){
      console.log(e);
      alert("Some error occured check console")
    }
    
  })

  render () {
    const {daiTokenBalance,dappTokenBalance,stakingBalance,amount } = this.state
    return (
      
      <div className="container">
        
        <h1>Token Farm</h1>
        <div className="col-md-6">
        <input className="form-control m-2 p-2 " type="text" placeholder="Enter number of Dai to stake" value={amount} onChange={(e)=>{this.setState({amount:e.target.value})}}></input>
        <div className="row d-flex">
        <button className="btn btn-primary m-2 col-md-4" onClick={this.stakeTokens}>Stake Tokens</button>
        <button className="btn btn-primary m-2 col-md-4 " onClick={this.unstakeTokens}>Get Tokens Back</button>
        </div>
        </div>
        <div><p className="lead">Mock Dai Staked : {(Number(stakingBalance))/10**18} Dai</p></div>
        <div><p className="lead">Dapp Balance : {(Number(dappTokenBalance))/10**18} Dapp</p></div>
        <div><p className="lead">Mock Dai Account Balance : {(Number(daiTokenBalance))/10**18} Dai</p></div>
        
        
      </div>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Dapp Page...</div>}
    render={({   web3, accounts, daiToken,dappToken,tokenFarm,daiTokenBalance,dappTokenBalance,stakingBalance  }:{   web3:any, accounts:any[], daiToken:any,dappToken:any,tokenFarm:any,daiTokenBalance:string,dappTokenBalance:string,stakingBalance:string  }) => (
      <Dapp accounts={accounts} daiToken={daiToken} dappToken={dappToken} tokenFarm={tokenFarm} daiTokenBalance={daiTokenBalance} dappTokenBalance={dappTokenBalance} stakingBalance={stakingBalance }  web3={web3} />
    )}
  />
)

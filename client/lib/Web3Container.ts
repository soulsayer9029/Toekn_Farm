import React,{ReactNode} from 'react'
import getWeb3 from './getWeb3'
import getContract from './getContract'
import daiContractDefinition from '../../build/contracts/DaiToken.json'
import dappContractDefinition from '../../build/contracts/DappToken.json'
import tokenFarmContractDefinition from '../../build/contracts/TokenFarm.json'
import Web3 from 'web3'
interface IProps {
  render: any;
  renderLoading: () => ReactNode;
}
interface Istate{
  web3:any,
  accounts: any[],
  daiToken:object,
  dappToken:object,
  tokenFarm:object,
  daiTokenBalance:string,
  dappTokenBalance:string,
  stakingBalance:string, 


}
export default class Web3Container extends React.Component<IProps,Istate> {
  state:Istate = { 
      web3: null,
      accounts: [],
      daiToken:{},
      dappToken:{},
      tokenFarm:{},
      daiTokenBalance:'0',
      dappTokenBalance:'0',
      stakingBalance:'0', 
    };

  async componentDidMount () {
    try {
      const web3:any = await getWeb3()
      
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      
      const daiToken = await getContract(web3, daiContractDefinition)
      console.log(daiToken)
      const dappToken = await getContract(web3, dappContractDefinition)
      const tokenFarm = await getContract(web3, tokenFarmContractDefinition)
      
      let daiTokenBalance= await daiToken.methods.balanceOf(accounts[0]).call();
      this.setState({daiTokenBalance:daiTokenBalance.toString()})
      
      let dappTokenBalance= await dappToken.methods.balanceOf(accounts[0]).call();
      this.setState({dappTokenBalance:dappTokenBalance.toString()})
      
      let stakingBalance= await tokenFarm.methods.stakedBalance(accounts[0]).call();
      this.setState({stakingBalance:stakingBalance.toString()})
      
      this.setState({web3, accounts, daiToken,dappToken,tokenFarm})

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contracts, Check console for details.`
      )
      console.log(error)
    }
  }

  render () {
    const { web3, accounts, daiToken,dappToken,tokenFarm,daiTokenBalance,dappTokenBalance,stakingBalance } = this.state
    return  web3 && accounts&& daiToken&&dappToken&&tokenFarm&&daiTokenBalance&&dappTokenBalance&&stakingBalance 
      ? this.props.render({  web3, accounts, daiToken,dappToken,tokenFarm,daiTokenBalance,dappTokenBalance,stakingBalance  })
      : this.props.renderLoading()
  }
}

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
class App extends Component {
	state={
	manager:'',
	players:[],
	balance:'',
	value:'',
	message:''
	};
 	async componentDidMount(){
 	const manager= await lottery.methods.manager().call(); 		
	this.setState({manager});
	const players= await lottery.methods.getplayer().call();
	const balance= await web3.eth.getBalance(lottery.options.address);
	this.setState({manager, players, balance});
	}
	onClick= async (event)=>{
		const accounts=await web3.eth.getAccounts();
		this.setState({message: 'waiting on transaction success..'});
		await lottery.methods.pickwinner().send({from: accounts[0]});
		this.setState({message: 'a winner has been picked..'});
	}
  onSubmit= async (event)=>{
	event.preventDefault();
	const accounts = await web3.eth.getAccounts();
	this.setState({message: 'waiting on transaction success..'});
	await lottery.methods.enter().send({from: accounts[0],
	value: web3.utils.toWei(this.state.value,'ether')
	});
	const balance= await web3.eth.getBalance(lottery.options.address);
	this.setState({balance});
	this.setState({message: 'you have been entered!'});
	};	
  render() {
	
    return (
      <div><h2>LOTTERY CONTRACT</h2>
	<p>
	This contract is managed by {this.state.manager}. 
	There are currently {this.state.players.length} people entered, competing for {web3.utils.fromWei(this.state.balance, 'ether')} ether!
	</p>
	<hr/>
	<form onSubmit={this.onSubmit}>
	<h4>Want to try your luck?</h4>
	<div>
	<lable>	Amount of ether to enter</lable>
	<input
		value={this.state.value} onChange={event => this.setState({value: event.target.value})}/>
	</div>
	<button>enter</button>
	</form>
	<hr/>
	<h4>Ready to pick a winner</h4>
	<button onClick={this.onClick}>pick a winner!</button>
	<hr/>
	<h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;

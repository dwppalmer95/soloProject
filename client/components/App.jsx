import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCoffeeShop: {
        name: '',
        wifiDownload: 0,
        wifiUpload: 0,
        streetAddress: '',
        zipCode: 0
      }
    }
    this.onChange  = this.onChange.bind(this);
    this.onCoffeeShopSubmit = this.onCoffeeShopSubmit.bind(this);
  }

  onChange = (coffeeShopPropName, value) => {
    const newCoffeeShop = {...this.state.newCoffeeShop};
    newCoffeeShop[coffeeShopPropName] = value;
    this.setState({newCoffeeShop});
  }

  onCoffeeShopSubmit = () => {
    const data = {...this.state.newCoffeeShop};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/coffeeShop', options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error posting coffee shop data. Status: ${ res.status }`)
        }
        console.log(res);
        var newCoffeeShop = {
          name: '',
          wifiDownload: 0,
          wifiUpload: 0,
          streetAddress: 0,
          zipCode: 0
        }
        this.setState({
          ...this.state,
          newCoffeeShop
        });
        this.forceUpdate();
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
        throw new Error('Error post coffee shop data. See console.');
      });
  }

  render() {
    return (
      <div>
        <h1>Select coffee shop</h1>

        <h1 class='Title'>Enter new coffee shop</h1>
        <InputBox placeholder='Name' value={this.state.newCoffeeShop.name} name='name' onChange={this.onChange}/>
        <InputBox placeholder='Wifi Download Speed (mbps)' value={this.state.wifiDownload} name='wifiDownload' onChange={this.onChange}/>
        <InputBox placeholder='Wifi Upload Speed (mbps)' entryValue={this.state.wifiUpload} name='wifiUpload' onChange={this.onChange}/>
        <InputBox placeholder='Street Address' entryValue={this.state.streetAddress} name='streetAddress' onChange={this.onChange}/>
        <InputBox placeholder='Zip Code' entryValue={this.state.zipCode} name='zipCode' onChange={this.onChange}/>
        <button onClick={this.onCoffeeShopSubmit}>Add coffee shop</button>
      </div>
    );
  }
};

const InputBox = props => {
  return (
  <div class='Input'>
    <input id='input' type='text' class='Input-text' placeholder={props.placeholder} value={props.value} onChange={e => props.onChange(props.name, e.target.value)}
      name={props.name}/>
    <label for='input' class='Input-label'>spacing</label>
  </div>
)};

// const DropDownList = props => {
//   return (

//   )
// }

export default App;
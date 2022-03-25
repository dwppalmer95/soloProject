import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCoffeeShop: {
        name: '',
        wifiDownload: 0,
        wifiUpload: 0,
        streetAddress: 0,
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
    console.log(this.state);
  }

  onCoffeeShopSubmit = () => {
    const newCoffeeShop = {...this.state.newCoffeeShop};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCoffeeShop)
    }
    console.log(options);
    fetch('/coffeeShop', options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error posting coffee shop data. Status: ${ res.status }`)
        }
        console.log(res);
        for (const property in newCoffeeShop) {
          newCoffeeShop[property] = '';
        }
        this.setState({newCoffeeShop});
      })
      .catch(e => {
        console.log(e);
        throw new Error('Error post coffee shop data. See console.');
      });
  }

  render() {
    return (
      <div>
        <h1>Enter new coffee shop</h1>
        <InputBox type='text' formName='Name' value={this.state.newCoffeeShop.name} name='name' onChange={this.onChange}/>
        <InputBox type='number' formName='Wifi Download Speed (mbps)' value={this.state.wifiDownloadMbps} name='wifiDownloadMbps' onChange={this.onChange}/>
        <InputBox type='number' formName='Wifi Upload Speed (mbps)' entryValue={this.state.wifiUploadMbps} name='wifiUploadMbps' onChange={this.onChange}/>
        <InputBox type='text' formName='Street Address' entryValue={this.state.streetAddress} name='streetAddress' onChange={this.onChange}/>
        <InputBox type='number' formName='Zip Code' entryValue={this.state.zipCode} name='zipCode' onChange={this.onChange}/>
        <button onClick={this.onCoffeeShopSubmit}>Add coffee shop</button>
      </div>
    );
  }
};

const InputBox = props => {
  return (
  <form>
    <label>
      {`${props.formName}: `}
      <input type={props.type} value={props.value} onChange={e => props.onChange(props.name, e.target.value)}
        name={props.name}/>
    </label>
  </form>
)};

export default App;
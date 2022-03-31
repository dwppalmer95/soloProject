import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCoffeeShop: {
        name: '',
        wifiDownload: '',
        wifiUpload: '',
        streetAddress: '',
        zipCode: ''
      },
      coffeeShopToSearch: '',
      displayCoffeeShop: {
        name: '',
        wifiDownload: 0,
        wifiUpload: 0,
        streetAddress: '',
        zipCode: 0
      }
    }
    this.onChangeNewCoffeeShop  = this.onChangeNewCoffeeShop.bind(this);
    this.postCoffeeShop = this.postCoffeeShop.bind(this);
  }

  onChangeNewCoffeeShop = (coffeeShopPropName, value) => {
    const newCoffeeShop = {...this.state.newCoffeeShop};
    newCoffeeShop[coffeeShopPropName] = value;
    this.setState({
      ...this.state,
      newCoffeeShop
    });
  }

  onChange = (_, value) => {
    const coffeeShopToSearch = value;
    this.setState({
      ...this.state,
      coffeeShopToSearch});
  }

  postCoffeeShop = () => {
    const data = {...this.state.newCoffeeShop};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    var newCoffeeShop = {
      name: '',
      wifiDownload: '',
      wifiUpload: '',
      streetAddress: '',
      zipCode: ''
    }
    this.setState({
      ...this.state,
      newCoffeeShop
    });
    fetch('/coffeeShop', options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error posting coffee shop data. Status: ${ res.status }`)
        }
        console.log(res);
        this.forceUpdate();
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
        throw new Error('Error posting coffee shop data. See console.');
      });
  }

  getCoffeeShop = () => {
    const coffeeShopName = this.state.coffeeShopToSearch;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    const serialize = function(obj) {
      var str = [];
      for (var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    }

    const endPoint = `/coffeeShop/?${serialize({coffeeShopName})}`
    fetch(endPoint, options)
      .then((res) => {

        if (!res.ok) {
          throw new Error(`HTTP error posting coffee shop data. Status: ${ res.status }`)
        }
        console.log(res);

        const coffeeShopToSearch = '';
        const displayCoffeeShop = {
          name: res.body.business_name,
          wifiDownload: res.body.avg_wifi_download_mbps,
          wifiUpload: res.body.avg_wifi_upload_mbps,
          streetAddress: res.body.street_address,
          zipCode: res.body.zip_code
        }
        console.log(displayCoffeeShop);
        this.setState({
          ...this.state,
          coffeeShopToSearch,
          displayCoffeeShop
        });

        this.forceUpdate();
        console.log(this.state);

      })
      .catch(e => {
        console.log(e);
        throw new Error('Error getting coffee shop data. See console.');
      }); 
  }

  render() {
    return (
      <div>
        <h1>Search for a coffee shop</h1>
        <InputBox placeholder='Coffee Shop Name' value={this.state.coffeeShopToSearch} name='coffeeShopToSearch' onChange={this.onChange}/>
        <button onClick={this.getCoffeeShop}>Search for coffee shop</button>
        <InfoDisplay title='Coffee Shop Name' detail={this.state.displayCoffeeShop.name}/>
        <h1 className='Title'>Enter new coffee shop</h1>
        <InputBox placeholder='Name' value={this.state.newCoffeeShop.name} name='name' onChange={this.onChangeNewCoffeeShop}/>
        <InputBox placeholder='Wifi Download Speed (mbps)' value={this.state.newCoffeeShop.wifiDownload} name='wifiDownload' onChange={this.onChangeNewCoffeeShop}/>
        <InputBox placeholder='Wifi Upload Speed (mbps)' entryValue={this.state.newCoffeeShop.wifiUpload} name='wifiUpload' onChange={this.onChangeNewCoffeeShop}/>
        <InputBox placeholder='Street Address' entryValue={this.state.newCoffeeShop.streetAddress} name='streetAddress' onChange={this.onChangeNewCoffeeShop}/>
        <InputBox placeholder='Zip Code' entryValue={this.state.newCoffeeShop.zipCode} name='zipCode' onChange={this.onChangeNewCoffeeShop}/>
        <button onClick={this.postCoffeeShop}>Add coffee shop</button>
      </div>
    );
  }
};

const InputBox = props => {
  return (
  <div className='Input'>
    <input id='input' type='text' className='Input-text' placeholder={props.placeholder} value={props.value} onChange={e => props.onChange(props.name, e.target.value)}
      name={props.name}/>
    <label htmlFor='input' className='Input-label'>spacing</label>
  </div>
)};

const InfoDisplay = props => {
  return (
    <dl>
      <dt>{props.title}</dt>
      <dd>{props.detail}</dd>
  </dl>
  );
}

// const DropDownList = props => {
//   return (

//   )
// }

export default App;
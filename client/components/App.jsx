import React, { Component, useState } from "react";

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
    this.postCoffeeShop = this.postCoffeeShop.bind(this);
  }

  onChange = (event) => {
    const value = event.target.value;
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
        <NewCoffeeShopInput postCoffeeShop={this.postCoffeeShop}/>
      </div>
    );
  }
};

const NewCoffeeShopInput = (props) => {

  const defaultCoffeeShop = {
    name: '',
    wifiDownload: '',
    wifiUpload: '',
    streetAddress: '',
    zipCode: ''
  };
  const coffeeShopProperties = Object.getOwnPropertyNames(defaultCoffeeShop);
  const [newCoffeeShop, setNewCoffeeShop] = useState(defaultCoffeeShop);

  const onChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    const updatedNewCoffeeShop = {...newCoffeeShop};
    updatedNewCoffeeShop[property] = value;
    
    setNewCoffeeShop(updatedNewCoffeeShop);
  };

  return (
    <div>
      <h1 className='Title'>Enter new coffee shop</h1>
      <InputBox placeholder='Name' value={newCoffeeShop.name} onChange={onChange} name={coffeeShopProperties[0]}/>
      <InputBox placeholder='Wifi Download Speed (mbps)' value={newCoffeeShop.wifiDownload} onChange={onChange} name={coffeeShopProperties[1]}/>
      <InputBox placeholder='Wifi Upload Speed (mbps)' value={newCoffeeShop.wifiUpload} onChange={onChange} name={coffeeShopProperties[2]}/>
      <InputBox placeholder='Street Address' value={newCoffeeShop.streetAddress} onChange={onChange} name={coffeeShopProperties[3]}/>
      <InputBox placeholder='Zip Code' value={newCoffeeShop.zipCode} onChange={onChange} name={coffeeShopProperties[4]}/>
      <button onClick={props.postCoffeeShop}>Add coffee shop</button>
    </div>
  );
};

const InputBox = props => {
  return (
  <div className='Input'>
    <input id='input' type='text' className='Input-text' placeholder={props.placeholder} value={props.value} onChange={props.onChange}
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
};

export default App;
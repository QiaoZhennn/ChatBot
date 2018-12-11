const priceInfo = require('./priceInformation');

class User {
  constructor(recipient) {
    this.recipient = recipient;
    this.price = 0;
    this.flavors = [];
    this.container = '';
    this.size = '';
    this.toppings = [];
    this.syrups = [];
    this.special = '';
    this.orderHistory = [];
    this.customerName = '';
  }

  resetOrder() {
    this.price = 0;
    this.flavors = [];
    this.container = '';
    this.size = '';
    this.toppings = [];
    this.syrups = [];
    this.special = '';
    this.customerName = '';
  };


  collectOrderInfo(action, parameters) {
    if (parameters['fields']['Flavor'] && parameters['fields']['Flavor']['listValue'].length !== 0) {
      console.log('listValue: ', parameters['fields']['Flavor']['listValue']['values']);
      for (let i = 0; i < parameters['fields']['Flavor']['listValue']['values'].length; ++i) {
        const flavor = parameters['fields']['Flavor']['listValue']['values'][i]['stringValue'];
        if (this.flavors.indexOf(flavor) === -1) {
          console.log('Add new flavor: ', flavor);
          this.flavors.push(flavor);
        }
      }
    }
    if (parameters['fields']['Container'] && parameters['fields']['Container']['stringValue'].length !== 0) {
      console.log('Chosen Container: ', parameters['fields']['Container']['stringValue']);
      this.container = parameters['fields']['Container']['stringValue'];
    }
    if (parameters['fields']['Size'] && parameters['fields']['Size']['stringValue'].length !== 0) {
      console.log('Chosen Size: ', parameters['fields']['Size']['stringValue']);
      this.size = parameters['fields']['Size']['stringValue'];
    }
    if (parameters['fields']['Special'] && parameters['fields']['Special']['stringValue'].length !== 0) {
      console.log('Chosen Special: ', parameters['fields']['Special']['stringValue']);
      this.special = parameters['fields']['Special']['stringValue'];
    }
    if (parameters['fields']['Syrup'] && parameters['fields']['Syrup']['listValue'].length !== 0) {
      for (let i = 0; i < parameters['fields']['Syrup']['listValue']['values'].length; ++i) {
        const syrup = parameters['fields']['Syrup']['listValue']['values'][i]['stringValue'];
        if (this.syrups.indexOf(syrup) === -1) {
          console.log('Add new syrup: ', syrup);
          this.syrups.push(syrup);
        }
      }
    }
    if (parameters['fields']['Toppings'] && parameters['fields']['Toppings']['listValue'].length !== 0) {
      for (let i = 0; i < parameters['fields']['Toppings']['listValue']['values'].length; ++i) {
        const topping = parameters['fields']['Toppings']['listValue']['values'][i]['stringValue'];
        if (this.toppings.indexOf(topping) === -1) {
          console.log('Add new topping: ', topping);
          this.toppings.push(topping);
        }
      }
    }
    if (parameters['fields']['username'] && parameters['fields']['username']['stringValue'].length !== 0) {
      const inputName = parameters['fields']['username']['stringValue'];
      console.log('Input Name: ', inputName);
      console.log('Get Customer Name: ', this.getName(inputName));
      this.customerName = this.getName(inputName);
    }
  };

  getName(userInput) {
    let name = userInput.split(/[ ,]+/);
    let firstNameIndex = name.indexOf('first');
    let lastNameIndex = name.indexOf('last');
    if(name.length <= 1) {
      return name[0];
    }else if(name.length <= 2) {
      return name[0] + ' ' + name[1];
    }else if(firstNameIndex !== -1) {
      if(lastNameIndex !== -1) {
        return name[firstNameIndex + 3] + ' ' + name[lastNameIndex + 3]
      }else{
        return name[firstNameIndex + 3]
      }
    }
    if(name.length > 2 && name.length <= 4) {
      return name[name.length - 1];
    }
    else if(name.length > 2 && name.length <= 5){
      return name[name.length - 2] + ' ' + name[name.length - 1]
    }
  }

  summarize() {
    if (this.size) {
      this.price += parseFloat(priceInfo[this.size]);
      console.log("Add size price: ", this.price);
    }
    if (this.toppings.length) {
      this.price += parseFloat(priceInfo['topping']) * this.toppings.length;
      console.log("Add toppings price: ", this.price);
    }
    if (this.syrups.length) {
      this.price += parseFloat(priceInfo['syrup']) * this.syrups.length;
      console.log("Add syrups price: ", this.price);
    }
    this.price = this.price.toFixed(2);
    console.log("Total price: ", this.price);
    this.userOrderInfo();
  };

  userOrderInfo() {
    this.orderHistory.push({
      'recipient': this.recipient,
      'special': this.special,
      'flavors': this.flavors,
      'container': this.container,
      'size': this.size,
      'toppings': this.toppings,
      'syrups': this.syrups,
      'price': this.price,
      'customerName': ''
    })
  };

  addCustomerName(orderHistoryIdx, customerName) {
    let currentOrder = this.orderHistory[orderHistoryIdx];
    currentOrder['customerName'] = customerName;
  }
}

module.exports = User;
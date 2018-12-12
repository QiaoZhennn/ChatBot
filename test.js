// lt --port 5000
function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [ '(', match[2], ')', match[3], '-', match[4]].join('')
  }
  return '-1'
}

function getName(userInput) {
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

function change(user) {
  user.syrups.push('abc');
}

/*
const Action =  'Build';
const Parameters:  { 'fields':
   { 'Toppings': { 'listValue': [Object], 'kind': 'listValue' },
     Type: { stringValue: '', kind: 'stringValue' },
     Syrup: { listValue: [Object], kind: 'listValue' },
     Flavor: { listValue: [Object], kind: 'listValue' },
     Size: { stringValue: 'small', kind: 'stringValue' },
     Container: { stringValue: 'cup', kind: 'stringValue' } } }

 */

console.log(getName('George, my last name is Lee'));
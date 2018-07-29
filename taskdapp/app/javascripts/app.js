// Import the page's CSS.
import '../stylesheets/app.css'

// Import Web3 libraries.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import taskMgmtArtifacts from '../../build/contracts/TaskManagement.json'

// TaskMgmt is our usable abstraction, which we'll use through the code below.
let TaskMgmt = contract(taskMgmtArtifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts;
let account;
let pressed = false;

window.App = {
  start: function () {
    // Bootstrap the TaskMgmt abstraction for Use.
    TaskMgmt.setProvider(web3.currentProvider) 
    this.getAccountsFromWeb3()
      .then(_accounts => this.initializeApplication(_accounts))
      .catch(err => alert('There was an error fetching your accounts.')) //Produce an error if there is no account present.
  },

  // Getting the accounts from web3
  getAccountsFromWeb3: function() {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((e, accounts) => {
        console.group("METHOD: getAccountsFromWeb3()");
        console.log("e ===", e);
        console.log("accounts ===", accounts);        
        console.groupEnd();        
        if(e != null) {
            reject(e);
        }
        else {
            resolve(accounts);
        }
      })  
    })
  },


  initializeApplication: function (_accounts) {

    console.group("METHOD: initializeApplication()");
    console.log("Input Parameter ===", _accounts);        
    console.groupEnd();  
    if (_accounts.length === 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
      return
    }
    accounts = _accounts
    account = accounts[0]

    this.watchEvents()
    this.getTxnsHistory()
  },

  watchEvents: function() {

    console.group("METHOD: watchEvents()");
          
    console.groupEnd(); 
    TaskMgmt.deployed().then(instance => instance.LogNewAddedTask().watch(function(error, result) {
        console.group("Inside LogNewAddedTask()");
        console.log("result ===", result); 
        console.groupEnd(); 
        (error, result) => this.postLogNewAddedTask(error, result)      
    }))
  },

  postLogNewAddedTask: function (error, result) {
    
    if (!error && pressed) {
      this.addRow(result.args.id, result.args.task, result.args.status, 
                  result.args.assignedTo, result.args.year, result.args.month,
                  result.args.date);
      pressed = false
    }
  },

  addRow: function (id, task, status, assignedTo, year, month, date) {
    
    let tableRef = document.getElementById('taskTable').getElementsByTagName('tbody')[0]

    // Insert a row in the table at the last row
    let newRow = tableRef.insertRow(tableRef.rows.length)

    // Insert a cell in the row at index 0
    let newIdCell = newRow.insertCell(0)
    let newTaskCell = newRow.insertCell(1)
    let newStatusCell = newRow.insertCell(2)
    let newAssignedToCell = newRow.insertCell(3)
    let newDateCell = newRow.insertCell(4) 

    // Append a text node to the cell
    let newId = document.createTextNode(id.toNumber())
    let newTask = document.createTextNode(task)
     let newStatus = document.createTextNode(status)
     let newAssignedTo = newRow.insertCell(assignedTo)     
    let newTime = document.createTextNode(year + month + date)


    newIdCell.appendChild(newId)
    newTaskCell.appendChild(newTask)
    newTimeCell.appendChild(newTime)
    newStatusCell.appendChild(newStatus)
    newAssignedToCell.appendChild(newAssignedTo)

    document.getElementById('IP_taskId').value = ''
    document.getElementById('IP_task').value = ''
    document.getElementById('IP_startDate').value = ''
    document.getElementById('IP_Status').value = ''
    document.getElementById('IP_AssignTo').value = ''
  },

  addTask: function () {
    
    TaskMgmt.deployed()
      .then(instance => this.addFormData(instance))
      .then(tx => console.log(tx.logs[0].args))
      .catch(e => console.error(e))
  },

  addFormData: function (instance) {
    
    pressed = true
    let newId = parseInt(document.getElementById('IP_taskId').value);
    let newTask = document.getElementById('IP_task').value;
    //let newTime = document.getElementById('time').value
    let status = document.getElementById('IP_Status').value;
    let assignTo = document.getElementById('IP_AssignTo').value;
    let year = "2018";
    let month = "7";
    let date = "23";
    return instance.addTask(newId, newTask, status, assignTo, 
                       year, month, date, { from: account, gas: 3000000 })
  },

  getTxnsHistory: function () {
    

    TaskMgmt.deployed()
      .then(instance => instance.getTotalTasksCount())
      .then(count => this.postTotalTasksCount(count))
      .catch(e => console.log("error in getTxnsHistory"));

  },

  postTotalTasksCount: function (count) {
    
    console.log("count:", count, count.valueOf());
    if (count.valueOf() > 0) {
      for (let i = 0; i < count.valueOf(); i++) {
        this.getTaskIdByIndex(i)
      }
    }
  },

  getTaskIdByIndex: function (i) {
    
    TaskMgmt.deployed()
      .then(instance => instance.getTaskIdByIndex(i))
      .then(id => this.getTaskById(id))
      .catch(e => console.error(e))
  },

  getTaskById: function (id) {
    
    TaskMgmt.deployed()
      .then(instance => instance.getTaskById(id.valueOf()))
      .then(values => this.addRow(id, values[0], values[1]))
      .catch(e => console.error("error in getTaskbyid ", e))
  }
}

window.addEventListener('load', function () {
  
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  App.start()
})

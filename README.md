# dapp_ethereum_mainet_task_mgmt

    I will be developing a Task Management DAPP and deploying on ROSPTEN NETWORK and ETHEREUM MAIN NETWORK.

    I have tried and used these during this project
        - Truffle
        - Deploying Smart contract on Rospten network\Ethereum main network
        - EthereumScan
        - Solidity

    
    The user can play with default template, if they want. If you just want 
    the basic structure of DAPP, please refer this repo: https://github.com/KushalGH/dapp_metacoin_testrpc_metamask     


# USE CASE: TASK MANAGEMENT FOR GOVERNMENT OFFICIALS\PROFESSTIONALS HAVING INTER DEPENDENCY

    I am focusing on sectors\organizations who has interdependency in work. I believe blockchain can help to fasten the 
    speed of work between the organizations, where they can track the current status of the work.


# WHY BLOCKCHAIN 

    Whenever I start any work on BLOCKCHAIN, I just focus on few things,

##IS THE TRUST LACKING IN THIS SCENARIO:
    Let's take an example of Government raising the fund for building a 
    flyover in a city. A private compony took the contract to build it. Multiple departments of both the governing bodies 
    are involved in this contract.

        **We cannot exactly trace** 
    
        - The work which is happening in particular department. We can just ask them the status, 
          and that too could be a single liner, "WORK IN PROGRESS!!"
    
        - If a department is actually putting the amount of money they are charging.

        - If a particular department is exactly working on this or not.
    
        **How blockchain will resolve**
        - We can build a Blockchain environment where we can track and validate the complete scenario. 
        - We can build a single source of trust among the organizations.
        - If any department feels he can raise an action for the department. 
        - Repotation of the department can be tracked.

##WHY NOT CENTRALISED SYSTEM

    All the departments will have there own management systems. If eveyone aggress, they can build a centralised 
    system but in that case, that will be handled by few Admins. Again, increasing the cases of fraud.

# Phase 0: 

    In this phase, I will just try to build a simple DAPP that will focus on single project where we can add multiple
    tasks, assign to the authorities, set some starting parameters, etc. just to have a POC ready. 
    
    In next phases, I will upgrade the contract to store multiple organizations and slowly will move the project to 
    have scenarios ready for my Use Case.     


# Development Environment
    
    - nodeJS version -- ^8.11.2 ( nodejs -v ) 
    - npm version -- 5.6.0 (npm -v)     
    - git -- 2.13.2 (git --version)
    - operating system -- windows 
    - testrpc -- 6.0.3 -- if you get the addresses then, it means your testrpc is installed in your system (if not installed: npm install -g ethereumjs-testrpc)
    - truffle -- @4.1.13 --It is the framework which is used to develop the ethereum DAPP (if not installed -- npm install -g truffle)
    - visual studio code editor -- (install solidity plugin using https://davidburela.wordpress.com/2016/11/18/configuring-visual-studio-code-for-ethereum-blockchain-development/)
    - metamask for chrome extension


    (note: for windows user, please run these commands in powershell in admin mode. We don't have a concept of sudo in windows, sudo is nothing but the admin mode in windows)    

    - To get Ethers in Test Rospten network
        - ropsten faucet (https://faucet.metamask.io/)


# Building the basic structure for DAPP

    (note: Please run these commands at the project location)
    - mkdir taskdapp
    - cd taskdapp
    - truffle unbox webpack -- creating the basic structure of DAPP (truffle unbox webpack)
                            -- migration files will migrate to Ethereum network
                            -- truffle js - Contains all the default truffle settings
    - testrpc (note: run in new powershell in admin mode)
    - truffle compile or truffle.cmd compile 
        - (note: Please run these commands at the project location)
        - (note: for windows user, if you gets an issue related to some js loads to fail, run truffle.cmd compile)
        - (note: truffle compile should start compiling, otherwise should use truffle.cmd compile)
        

    - truffle migrate or truffle.cmd migrate - This deploys your contract to Ethereum network
        - (note: Please run these commands at the project location)

    - testrpc ususally works on localhost:8545 so we will connect to Ethereum local network in meta mask
    - npm run dev -- [http://localhost:8080/] to run this default structure
    - You can import accounts of testrpc to metamask using "import Account". This account will also have 100 Ethers.


    # IMPORTANT NOTES: I would like to share some important things here
    1. When you run testrpc, you will get a Menonic in the powershell.
    2. copy that  Menonic and open metamask in chrome.
    3. Login using Menonic and set the password. You will receive 100 ETHER if yours testrpc is connected to metamask.
       Also notice that the first address of your testrpc will get added to metamask.
    4. Run truffle compile. It should show you compiling.
    5. truffle migrate should run 1_initial_migrtae.js and 2_deploy_contracts.js   
    6. You should see DAPP page.     


                            



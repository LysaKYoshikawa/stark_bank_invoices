# :page_with_curl: stark_bank_invoices

![image](https://github.com/LysaKYoshikawa/stark_bank_invoices/assets/64383080/2b4a4cef-d632-4fef-91d2-37310945cac0)


#  :star: About the project
This project is an application that generates invoices, and after these invoices are paid, they are marked as paid, and their fees are deducted. With the webhook connection, the transfer is sent to the bank.

## :rocket: Challenges

One of my main challenges was working with webhooks. As this was not a technology I was familiar with, there was a learning curve to understand how it works.

### :loudspeaker: Features

- [x]  Consume API
- [x]  Logic to create invoices
- [x]  Handling of paid status
- [x]  Deduction of discounts
- [x]  Adding transfers
- [x]  Scheduling for script execution
- [x]  Unit Test

# :computer: Technologies and Tools

- Javascript
- node.js
- jest
- api starkbank
- postman

### Study Sources

- [Starkbank github](<https://github.com/starkbank/sdk-node>)

- [Doc Api](https://starkbank.com/docs/api)


### :pushpin: How to run the project

  - Clone the repository
  $ git clone <https://github.com/LysaKYoshikawa/stark_bank_invoices>
  
 - Text editor
It is advisable to use a text editor like Visual Studio Code.

- Install dependencies
npm install

- Keys and Starkbank webhook connection

- Create your starkbankConfig.js file with the necessary configurations

- To run the application, the scheduling is set to run every 3 hours
node index.js


# :pushpin: Author
Monalysa Klauck Yoshikawa
[Linkedin] : <https://www.linkedin.com/in/monalysa-yoshikawa/>


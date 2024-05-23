#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


class bank {
    static counter =  100
    accountNum : number 
    name: string
    fatherName: string
    cnic:number
    Emails: string
    contact_number:number
    age: number
    account_type: string
    gender: string
    balance = Math.floor(Math.random() * 100000)
  
    constructor(name: string,Emails:string,contact_number:number,account_type:string, fatherName: string,cnic:number, age: number, gender: string) {
        this.accountNum=bank.counter++
        this.name = name
        this.fatherName = fatherName
        this.cnic = cnic
        this.Emails = Emails
        this.age = age 
        this.account_type = account_type
        this.gender = gender
        this.contact_number=contact_number
    }
    viewBalance() {
        console.log(chalk.bold.green(`\n NAME : ${this.name} \n FATHER NAME : ${this.fatherName} \n CNIC : ${this.cnic} \n Account Number : ${this.accountNum} \n BALANCE : ${this.balance} \n `))
    };
    deposit(amount: number) {
        this.balance = this.balance + amount
        console.log(chalk.bold.green(`\n NAME : ${this.name} \n FATHER NAME : ${this.fatherName} \n CNIC : ${this.cnic} \n Account Number : ${this.accountNum} \n`))
        console.log(chalk.bold.green(`Your New Balance Is ${this.balance}\n`));
    };
    withdraw(amount: number) {
        if(this.balance >= amount) { 
            this.balance = this.balance - amount
            console.log(chalk.bold.green(`\n NAME : ${this.name} \n CNIC : ${this.cnic} \n Account Number : ${this.accountNum} \n`))
            console.log(chalk.bold.green(`Your New Balance Is ${this.balance}\n`))
        }
        else{
            console.log(chalk.bold.red(`Insufficient Balance`));
        }
    };
    transfer_amount(amount: number,reciver:number ) {
        if(this.balance > amount){   
            this.balance = this.balance - amount
            console.log(chalk.bold.green(`\nDear ${this.name} ${amount} PKR SuccessFully Transferd to ${reciver}\n `))
        }
        else{
            console.log(chalk.bold.red(`Insufficient Balance`));
        };
    };
    account_status (){
        console.log(chalk.bold.green(`\n NAME : ${this.name} \n FATHER NAME : ${this.fatherName} \n CNIC : ${this.cnic} \n Email : ${this.Emails} \n Account Number : ${this.accountNum} \n Contact : ${this.contact_number} \n Account Type : ${this.account_type} \n Age : ${this.age} \n Gender : ${this.gender} \n BALANCE : ${this.balance} \n `))
    }
 
};

class bank_managment {
    manage:bank[]=[];

    add_account(name: string,Emails:string,contact_number:number,account_type:string, fatherName: string,cnic:number, age: number, gender: string) {
        let data=new bank(name,Emails,contact_number,account_type, fatherName,cnic, age, gender)
        this.manage.push(data)
        console.log(chalk.bold.green(`Account Successfully Created! Your Account Number Is : ${data.accountNum}\n\nName : ${name}\nFather Name : ${fatherName}\nEmail : ${Emails}\nCNIC : ${data.cnic}\nContact Number : ${contact_number}\nAccount Type : ${account_type}\n`));
    };
    balance(acc_num:number,) {
       let costumer=this.manage.find(m => m.accountNum === acc_num);
        if(costumer){
            costumer.viewBalance()
        }else{
            console.log(chalk.bold.red(`Account Not Found\n`));
        }
    };
    deposit(acc_num:number,amount:number) {
        let costumer=this.manage.find(value => value.accountNum === acc_num);
        if(costumer){
            costumer.deposit(amount)
        }else{
            console.log(chalk.bold.red(`Account Not Found\n`));
        }
    };
    withdraw(acc_num:number,amount:number) {
        let costumer=this.manage.find(value => value.accountNum === acc_num);
        if(costumer){
            costumer.withdraw(amount)
        }else{
            console.log(chalk.bold.red(`Account Not Found\n`));
        };

    };
    transfer_amount(sender:number, reciever : number , amount:number ) {
        let costumer=this.manage.find(value => value.accountNum === sender);
        if(costumer){
            costumer.transfer_amount(amount ,reciever )
        }else{
            console.log(chalk.bold.red(`Account Not Found\n`));
        }
    };
    account_status(acc_num:number) {
        let costumer=this.manage.find(value => value.accountNum === acc_num);
        if(costumer){
            costumer.account_status()
        }else{
            console.log(chalk.bold.red(`Account Not Found\n`));
        }
    }
}

let banker = new bank_managment()

let conditions:boolean = true

while(conditions){
let selector=await inquirer.prompt(
    {
        type: "list",
        name: "selector",
        message: "Select An Option :",
        choices: [
            "Create Account",
            "View Balance",
            "Deposit",
            "Withdraw",
            "Transfer Amount",
            "Account Status",
            "Exit"
        ]
    }
)
if(selector.selector === "Create Account"){
    let addAccount=await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Enter Your Name :",
        validate : function(value){
            if(value.length < 3) {
                return "Name should be at least 3 characters"

            }else if(!isNaN(value)){
                return "error"
            }
            else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "fatherName",
        message: "Enter Your Father Name :",
        validate : function(value){
            if(value.length < 3) {
                return "Name should be at least 3 characters"

            }else if(!isNaN(value)){
                return "error"
            }
            else{
                return true
            }
        }
    },
    {
        type: "email",
        name: "Emails",
        message: "Enter Your Email :",
        validate : function(value){
            if(value.length < 14 && value.length > 20) {
                return "Please Enter a valid email address"

            }else if(!isNaN(value)){
                return "error"
            }
            else{
                return true
            }
        }
    },
    {
        type:"number",
        name:"cnic",
        message: "Enter Your CNIC :",
        validate:function (value){
            if(value.toString().length !== 13) {
                return "Invalid CNIC Number"
            }else if(isNaN(value)){
                return "Please Enter a valid number"
            }
            else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "contact_number",
        message: "Enter Your Contact Number :",
        validate: function(value){
            if(value.toString().length !== 11) {
                return "Please enter a valid Number"
            }else if(isNaN(value)){
                return "Please enter a valid Number"
            }
            else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "age",
        message: "Enter Your Age :",
        validate: function(value){
            if(value > 18) {
                return true
            }else if(isNaN(value)){
                return "Invalid Age"
            }
            else{
                return true
            }
        }
    },
    {
        type: "list",
        name: "gender",
        message: "Select Your Gender :",
        choices: ["Male", "Female"]
    },
    {
        type: "list",
        name: "account_type",
        message: "Select Your Account Type :",
        choices: ["Savings", "Current"]
    },
]);


console.log(`\n`);
banker.add_account(addAccount.name, addAccount.Emails, addAccount.contact_number, addAccount.account_type, addAccount.fatherName, addAccount.cnic, addAccount.age, addAccount.gender)

}
else if(selector.selector === "View Balance"){
    let bal=await inquirer.prompt(
        {
            name:"bal",
            type:"number",
            message:"Enter Your Account Number :",
            validate : function(value : number) {
                if(isNaN(value)){
                    return "Please Enter a valid number"
                }
                else{
                    return true
                }
            }
        }    
    )
    banker.balance(bal.bal);
}
else if (selector.selector === "Deposit"){
    let deposit=await inquirer.prompt(
        {
            name:"deposit",
            type:"number",
            message:"Enter Your Account Number :",
        }    
    )
    let amount=await inquirer.prompt(
        {
            name:"amount",
            type:"number",
            message:"Enter Amount :",
        }    
    )
    banker.deposit(deposit.deposit,amount.amount);
}
else if(selector.selector === "Withdraw"){
    let withdraw=await inquirer.prompt(
        {
            name:"withdraw",
            type:"number",
            message:"Enter Your Account Number :",
        }    
    )
    let amount=await inquirer.prompt(
        {
            name:"amount",
            type:"number",
            message:"Enter Amount :",
        }    
    )
    banker.withdraw(withdraw.withdraw,amount.amount);
}else if(selector.selector === "Transfer Amount"){
    let transfer=await inquirer.prompt(
        {
            name:"transfer",
            type:"number",
            message:"Enter Your Account Number :",
        }    
    )
    let amount=await inquirer.prompt(
        {
            name:"amount",
            type:"number",
            message:"Enter Amount :",
        }    
    )
    let reciever=await inquirer.prompt(
        {
            name:"reciever",
            type:"number",
            message:"Enter Reciever Account Number :",
        }    
    )
    banker.transfer_amount(transfer.transfer,reciever.reciever,amount.amount);
}

else if(selector.selector === "Account Status"){
    let status=await inquirer.prompt(
        {
            name:"status",
            type:"number",
            message:"Enter Your Account Number :",
        }    
    )
    banker.account_status(status.status);
}
else if(selector.selector === "Exit"){
        conditions=false;
        console.log((`Thanks You!`));
        break;
}
}
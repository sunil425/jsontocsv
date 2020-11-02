const express= require('express')
const csvtojson=require('csvtojson')
const converter = require('json-2-csv');
const lodash  = require('lodash');


const fs =require('fs')
const csvPath='main.csv'
const filteredCountryPath='filteredCountry.csv'
var jsonOutput
const app=express()




app.get('/',(req,res)=>{
res.send(jsonOutput)
})

function checkCountryUSA(value) {
    return value.COUNTRY.includes("USA");
  }
  
//   console.log(f)
csvtojson()
.fromFile(csvPath)
.then((json)=>{
    
    converter.json2csv(json.filter(checkCountryUSA) , (err,csv)=>{
        if (err) {
            console.log(err)
        }
        // console.log(csv)
        fs.writeFileSync("filteredCountry.csv",csv,"utf-8",(err)=>console.log(err))

    })


})

csvtojson()
.fromFile(filteredCountryPath)
.then((json)=>{
    json.sort(function(a, b){return a.PRICE - b.PRICE});

    jsonOutput=json


})








app.listen(3000,()=>{
    console.log('listening on 3000')
})




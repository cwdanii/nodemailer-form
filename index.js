const fs = require('fs')
const express = require('express');
const app = express();
const port = 80;
const nodmailer = require('nodemailer');

app.use(express.static('views'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html')
})

app.post('/', (req,res) => {
    console.log(req.body)

    const transporter = nodmailer.createTransport({
        service: "gmail",
        auth: {
            user:'dk301442@gmail.com',
            pass: "ralowgbcijqqvlmz"
        }
    })

    const mailoption = {
        from: req.body.email,
        to: 'dk301442@gmail.com',
        subject: `message from ${req.body.email}: ${req.body.name}`,
        text: req.body.message
    }

    transporter.sendMail(mailoption, (error, info)=>{
        if(error){
            console.log(error)
            res.send('error')
        }
        else{
            console.log("Email sent")
            res.send('success')
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
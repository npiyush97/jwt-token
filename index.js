const express = require('express')
const jwt = require('jsonwebtoken')

let app = express()

app.post('/api/post', verifyToken,(req,res)=>{
    jwt.verify(req.token,'hash',(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{

            res.json({
                message:'post created'
                ,authData
            })
        }
    })
})

app.post('/api/login',(req,res) =>{
    const user = {
        id:1,
        uName:'matt',
        email:'kjkjk@gmail.com'
    }
    jwt.sign({ user },'hash', { expiresIn: '1h' },(err,token)=>{
        res.json({
            token
        })
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearToken = bearer[1]
        req.token = bearToken
        next()
    }else{
        res.sendStatus(403)
    }
}

app.listen(9000, () =>{console.log('server started')})

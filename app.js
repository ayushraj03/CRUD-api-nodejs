const express = require('express')
const employee = require ('./employee')
const app = express()

app.use(express.json())

app.listen(3000, ()=>{
    console.log('server started')
})

app.get('/', (req, res)=> {
    res.json({message : "API is working"})
})

app.get('/api/employee', (req,res)=> {
    res.json (employee)
})

app.post('/api/employee', (req, res) => {

    if(!req.body.email){
        res.status(400)
        return res.json({error: "email is required"})
    }


    const user = {
        id: employee.length + 1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email
    }

    employee.push(user)

    res.json(user)
})

app.put('/api/employee/:id', (req, res)=> {
    let id = req.params.id
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email

    let index = employee.findIndex((employee)=> {
        return(employee.id == Number.parseInt(id))
    })

    if (index >= 0){
        let emp = employee[index]
        emp.first_name = first_name
        emp.last_name = last_name
        emp.email = email
        res.json(emp)
    } else{
        res.status(404)
    }

})

app.delete("/api/employee/:id", (req, res)=> {
    let id = req.params.id;
    let index = employee.findIndex((employee)=> {
        return(employee.id == Number.parseInt(id))
    })
    if (index >= 0){
        let emp = employee[index]
        employee.splice(index, 1 )
        res.json(emp)

    } else{
        res.status(404)
        res.end()
    }
})
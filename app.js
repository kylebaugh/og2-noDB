import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'

const app = express()
const port = 2319

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

ViteExpress.config({printViteDevServerHost: true})

let myId = 5

const toDoList = [
    {id:1, name:'Groceries', complete:false},
    {id:2, name:'Clean kitchen', complete:false},
    {id:3, name:'Take out trash', complete:false},
    {id:4, name:'Fight Ganon', complete:false}
]

const doneList = [
    {id: 1, name: 'Wash the dog', complete: true}

]


// ROUTES

app.get('/api/todo', (req,res) => {
    res.send({open: toDoList, closed: doneList})
})

app.post('/api/todo', (req, res) => {
    const {name} = req.body
    toDoList.push({
        id: myId,
        name,
        complete: false
    })

    myId++

    res.send({open: toDoList, closed: doneList})
})

app.put('/api/todo/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body

    let index = toDoList.findIndex(item => item.id === +id)

    toDoList[index].name = name

    res.send({open: toDoList, closed: doneList})
})

app.delete('/api/todo/:id', (req, res) => {
    const {id} = req.params

    let index = toDoList.findIndex(item => item.id === +id)

    doneList.push(toDoList[index])

    toDoList.splice(index, 1)

    res.send({open: toDoList, closed: doneList})
})


ViteExpress.listen(app, port, () => console.log(`We've got a ${port}! Repeat, server running on port http://localhost:${port}`))
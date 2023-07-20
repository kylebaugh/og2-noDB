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


// ROUTES

app.get('/api/todo', (req,res) => {
    res.send(toDoList)
})


ViteExpress.listen(app, port, () => console.log(`We've got a ${port}! Repeat, server running on port http://localhost:${port}`))
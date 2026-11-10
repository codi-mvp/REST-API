import express from "express"
const app = express()
const PORT = 3000
let db = []
app.use(express.json())

app.get("/items", (req, res) => {
    res.json(db)
})

app.post("/items", (req, res) => {
    const newEntity = {
        id: db.length, status: "in moderate"
    }

    db.push(newEntity)
    res.status(201).json({ message: "Successfully added!"})
})

app.patch("/items/:id", (req, res) => {
    const targetID = parseInt(req.params.id)
    const item = db.find(item => item.id === targetID)
    if (!item) {
        return res.status(404).json({ message: `Object with id ${targetID} not found`})
    }

    Object.assign(item, req.body)

    res.json(item)
})

app.delete("/items/:id", (req, res) => {
    const targetID = parseInt(req.params.id)
    const item = db.find(item => item.id === targetID)
    if (!item) {
        return res.status(404).json({ message: `Object with id ${targetID} not found`})
    }

    db = db.filter(item => item.id !== targetID)
    res.status(200).json({ massege: "Система стерта. Логи зачищены. Нас здесь никогда не было..."})
})

app.listen(PORT, () => {
    console.log(`Server is started -> http://localhost:${PORT}/`)
})
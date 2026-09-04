const express = require("express")
const app = express()
const fs = require("fs")
const cors = require("cors")

app.use(cors())
app.use(express.json())


app.get("/read/:id", (req, res) => {
    let data = {
        "data": null,
        "err": null
    }
    try {
        const fileData = fs.readFileSync(`./${req.params.id}.json`, 'utf-8')
        data.data = fileData
    } catch (error) {
        data.err = error
    }

    res.write(JSON.stringify(data))
    res.end()
});

app.post("/write/:id", (req, res) => {
    
    let response = {
        "success": false,
        "err": null
    }

    try {
        fs.writeFileSync(`./${req.params.id}.json`, JSON.stringify(req.body, null, 2))
        response.success= true
    } catch (error) {
        response.success = false
        response.err = error
    }

    res.write(JSON.stringify(response))
    res.end()

})


app.listen(5000)
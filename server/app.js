require("dotenv").config()
const connectDB = require("./db/connect")
const express = require("express")
const cors = require("cors")

const app = express()

const Posts = require("./routes/post_routes")
const Images = require("./routes/images_routes")


app.use(express.json({}))
app.use(cors())

app.use('/api/v1/post', Posts)
app.use('/api/v1/images', Images)

const PORT = process.env.PORT

app.get('/', (req, res) =>{
  res.send("app started")
})

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`App started and listening on PORT ${PORT}`))
  } catch (error) {
    console.error(`An error occured. This is the error ${error}`)
  }
}

startApp()
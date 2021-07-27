// imports
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
//app config
const app = express();
const port = process.env.PORT || 9000;

// midlewares
app.use(express.json());
app.use(cors());

//Routes  
const user = [];

app.get('/login', (req, res) => {
  res.status(200).send(user)
})


app.post('/login', async (req, res) => {

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt)
    console.log(hashedPassword)
    const admin = { name: req.body.name, password: hashedPassword };
    user.push(admin)
    res.status(201).send(true)
  } catch {
    res.status(500).send()
  }

})


//listener server
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
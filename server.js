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
// app.use(express.urlencoded({ extended: true }))
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "GET, POST, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// })
//Routes  
const admin = [
  {
    name: "benek",
    password: "$2b$10$h9zfKLD3fsbHjhZXl/.UN.Zm7b9wNEe1/yYnuvBicarHPSG9xOQ2W"
  }
];
const messages = [

];



////////////////// GET MESSAGES ////////////////
app.get('/messages', (req, res) => {
  res.json(messages)
})
////////////////// POST MESSAGES ///////////////
app.post('/messages', (req, res) => {
  const txt = req.body.areaValue;
  try {
    messages.push({
      id: messages.length,
      message: txt,
      date: new Date()
    })
  } catch {
    console.log('something wrong')
  }
})



/////////////////// DELETE MESSAGE ////////////// 
app.delete('/messages/delete', (req, res) => {

  const idRemove = parseInt(req.body.data)
  try {
    const messageIndex = messages.findIndex(item => item.id === idRemove);
    if (messageIndex === -1) {
      console.log('wrong index');
      return
    }
    messages.splice(messageIndex, 1);

    for (let i = 0; i < messages.length; i++) {
      messages[i].id = i;
    }

  } catch {
    console.log('Error with remove')
  }
})


////////////////// POST LOGIN //////////////////
app.post('/login/admin', async (req, res) => {

  const user = admin.find(item => item.name === req.body.name);

  if (user === null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {

      res.json('Succes')

    } else {
      res.json('Not allowed')
    }
  } catch {
    res.status(500).json('Wrong')
  }
})



//listener server
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
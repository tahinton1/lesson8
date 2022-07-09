import express  from "express";
import cors from 'cors'
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js";

// app config
const app = express();
const port = process.env.PORT || 8080;
const pusher = new Pusher({
  appId: "1435131",
  key: "c6f85af1f3bbce9b6b0f",
  secret: "69e890aa1efc6341ed0a",
  cluster: "us2",
  useTLS: true
});

//middlewares
app.use(express.json());
app.use(cors())

//Db config
const connection_url = 'mongodb+srv://admin:0EOEeAFBlpGRiFJy@cluster0.07g7chn.mongodb.net/instaDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useNewURLparser:true,
    useUnifiedTopology:true
})

mongoose.connection.once('open',() =>{
    console.log('DB Connected')  
    const changeStream = mongoose.connection.collection('posts').watch()
        changeStream.on('change', (change)=>{
            console.log('ChgStream Triggered on pusher...')
            console.log(change)
            console.log('End of Change')

            if(change.operationType === 'insert'){
                console.log('Triggering Pusher *** Img Upload***')
                const postDetails = change.fullDocument;
                pusher.trigger('posts', 'inserted', {
                    user: postDetails.user,
                    user: postDetails.caption,
                    image: postDetails.image
                })
            }else{
                console.log('unknown trigger from Pusher')
            }

        })  
})
//api routes
app.get('/', (req,res) => res.status(200).send('hello world'));
//push an image
app.post('/upload', (req, res)=>{
    const body = req.body;
    dbModel.create(body,(err, data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);                
        }
    })
});

app.get('/sync', (req,res)=> {
    dbModel.find((err, data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);                
        }
    })
})



//listens

app.listen(port, () => console.log(`listening on localhost:${port}`))
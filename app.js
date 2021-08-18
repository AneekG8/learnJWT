const   mongoose    =   require('mongoose'),
        express     =   require('express'),
        dotenv      =   require('dotenv').config(),

        app         =   express();


//setting up the port
const port = process.env.PORT || 5000;


//view engine
app.set('view engine','ejs');

//middlewares
app.use(express.static('public'));



//DB connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v2eze.mongodb.net/learningJWT?retryWrites=true&w=majority`;

mongoose.connect(dbURI,{useUnifiedTopology: true,useNewUrlParser: true})
    .then(res => {
        app.listen(port,()=>{
            
            console.log('server has started....');
        })
    })
    .catch(e=>{
        console.log(e)
    })


//routes
app.get('/',(req,res)=>{
    res.send('home');
    //res.render('home');
})

app.get('/hidden',(req,res)=>{
    res.send('hidden');
    //res.render('hidden')
})

app.get('*',(req,res)=>{
    res.send('this page doesn\'t exist');
})
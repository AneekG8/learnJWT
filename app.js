const   cookieParser    =   require('cookie-parser'),
        mongoose        =   require('mongoose'),
        express         =   require('express'),
        dotenv          =   require('dotenv').config(),
        jwt             =   require('jsonwebtoken'),

        app             =   express();



//routes
const   pageRoutes  =   require('./routes/pageRoutes'),
        authRoutes  =   require('./routes/authRoutes');


//DB properties
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v2eze.mongodb.net/learningJWT?retryWrites=true&w=majority`;
const dbOptions = {useUnifiedTopology: true,useNewUrlParser: true};        


//setting up the port
const port = process.env.PORT || 5000;


//view engine
app.set('view engine','ejs');

//middlewares
app.use(express.static('public'));  //use public as the static folder
app.use(express.json());    //json parser
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));


//check user on each route
app.use((req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        try{
            const decodedToken = jwt.verify(token,process.env.SESSION_SECRET);
            res.locals.isAuth = true;
        }
        catch(err){
            res.locals.isAuth = false;
        }
    }
    else{
        res.locals.isAuth = false;
    }

    next();
})


//DB connections
mongoose.connect(dbURI,dbOptions)
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
    res.redirect('/home');
})

app.use(pageRoutes);

app.use(authRoutes);

app.get('*',(req,res)=>{
    res.status(404).send('this page doesn\'t exist');
})
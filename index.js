const express = require('express')
const cors  = require ('cors')
const bodyParser = require('body-parser')
const path  = require('path')
const methodOverride = require('method-override')
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

const authRouter = require('./routes/auth')
const dashboardRouter = require('./routes/dashboard-Router')

app.set('view engine', 'ejs')
app.set('views' , 'views')

app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));
app.use(dashboardRouter.routes)
app.use(authRouter.routes)

const PORT = process.env.PORT||4000
app.listen(PORT,()=> console.log(`Sever running in `+PORT))
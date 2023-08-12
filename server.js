const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path : './config/config.env'});
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');

// Route Files
const bootCampRoutes = require('./routes/bootcamp');
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');




connectDB();

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'DEVELOPMENT'){
    app.use(morgan('dev'));
}

app.use(mongoSanitize());
app.use(helmet());


app.use(cookieParser());

// File upload
app.use(fileupload());

app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname,'public')));

// Mount Routers
app.use('/api/v1/bootcamps',bootCampRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/reviews',reviewRoutes);

// Unhandled errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT , console.log(`Serve running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

process.on('unhandledRejection' , (err , promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(()=> process.exit(1));
})
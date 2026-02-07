const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

const bookRoutes = require('./routes/books');
app.use('/api/books/',bookRoutes);

const userRoutes = require('./routes/users');
app.use('/api/user/',userRoutes);

//db connection
mongoose.connect('mongodb://127.0.0.1:27017/booksdb',{

}).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.error('MongoDB connection error : ', err);
});

//default route
app.get('/', (req,res)=>{
    res.send('backend is running');
});

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

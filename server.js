const express = require('express');

const app = express();

app.get('/',(rq,res)=>res.json({message: 'welcome to the contact api'}))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server started on port ${PORT}`));
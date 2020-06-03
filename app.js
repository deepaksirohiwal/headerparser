const Express= require('express');
const app= Express();
const bodyParser=require('body-parser');
const cors= require('cors');
const port= 3000;
const requestIp= require('request-ip');
app.use(bodyParser.json());
app.use(cors());
//ip middleware
app.use(function(req,res,next){
    var clientIp=requestIp.getClientIp(req); // requesting ip from cliet side
    next();
});
app.use(requestIp.mw());
app.get('/api/whoami',function(req,res){
    var ipAddress=req.clientIp;
    var language= req.acceptsLanguages();// language used 
    var software= req.get('user-agent');

    res.json({
        ipAddress:ipAddress,
        language:language[0],
        software:software
    });
});



app.listen(port, function(){console.log(`connected on ${port}`)})
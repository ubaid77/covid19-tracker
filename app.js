var express = require('express'),
    request = require('request'),
    app     = express();

app.set("view engine","ejs");
app.set("PORT", process.env.PORT || 3000);
app.use(express.static("public"));


app.get("/", function(req, res){
    request("https://api.covid19api.com/summary", function(error,response,body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);

            request("https://api.covid19api.com/live/country/india/status/confirmed",function(error, reponse, body2){
                if(!error && response.statusCode==200){
                    var data2 = JSON.parse(body2);
                    res.render("home",{data: data, data2:data2});
                }
            })
            
            
        }
    });
})



app.listen(app.get("PORT"),function(){
    console.log("Server started at "+app.get("PORT"))
})
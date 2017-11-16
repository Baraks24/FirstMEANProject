module.exports = function(app){
    app.route('/about').get((req,res)=>{
        res.status(200).send("Hello Welcome to my site man!");
    });
}
module.exports = function(app){
    app.route('/about').get((req,res)=>{
        let message;
        if(req.user){
            message = `Welcome to my site ${req.user.firstName} ${req.user.lastName}`;
        }
        else{
            message = 'Welcome to my site Unknown man';
        }
        res.status(200).send({data:message});
    });
}
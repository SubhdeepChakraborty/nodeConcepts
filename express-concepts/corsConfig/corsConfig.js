import cors from "cors"

//About Cors
//Cors basically means cross origin resources sharing
//It generally allows frontend and backend to data share 
// As they both running on different ports
//We need to enable it -> backend

const configureCors = () => {
    return cors ({
        //Origin: this will tell like which origins the user can access your api
        origin : (origin, callback) => {
            const allowOrigins = [
                "http://localhost:3000", //Local development thing
                "https://yourCustomDomain.com" //Production domain
            ]
            //If the requested origin isn't in the list reject it
            if(!origin || allowOrigins.indexOf(origin) !== -1){
                callback(null, true) //giving permission so that req can be allowed
            }else{
                callback(new Error('Not allowed by cors'))
            }
        },
        //Methods which http method you wanted to allow
        methods : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders : [
            'content-Type',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders : ['X-Total-Count', 'Content-Range'],
        //This credentials thing is imp -> when we using cookies this is imp need to be passed as true
        credentials : true,
        preflightContinue : false,
        maxAge : 600, // Catch pre flight request to 10min -> helping you to avoid sending option request multiple time
        optionsSuccessStatus : 204 //Successful oprion request
    })
}

export {configureCors}
//Like user can call api like 10 times not more then that.. otherwise block

import rateLimit from "express-rate-limit"

const createRateLimit = (maxRequest, time) => {
    return rateLimit({
        max : maxRequest,
        windowMs : time,
        message : 'Too many request. Please try again later!',
        standardHeaders : true,
        legacyHeaders : false
    })
}

export {createRateLimit}
//Api versioning

const urlVersioning = (version) => (req, res, next) => {
    if(req.path.startsWith(`/api/${version}`)){
        next()
    }else{
        res.status(400).send({
            status : false,
            'message' : 'Api version is not supported'
        })
    }
}

const headerVersioning = (version) => (req, res, next) => {
    if(req.get('Accept-version') === version){
        next()
    }else{
        res.status(400).send({
          status: false,
          message: "Api version is not supported",
        });
    }
}

const contentTypeVersion = (version) => (req, res, next) => {
    const contentType = req.get('Content-Type')
    if(contentType && contentType.includes(`application/vnd.api.${version}+json`)){
        next()
    }else{
        res.status(400).send({
          status: false,
          message: "Api version is not supported",
        });
    }
}

export {urlVersioning, headerVersioning, contentTypeVersion}
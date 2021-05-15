const jwt = require('jsonwebtoken');
const fs = require('fs');
path = require('path')
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname , '../keys/jwtRS256.key'));

validateEmailAndPassword = () => {
    return true;
}

findUserIdForEmail = () => {
    return 'abc123';
}

// Retrieve all products from the database.
exports.login = (req, res) => {
    const email = req.body.email,
          password = req.body.password;

    if (validateEmailAndPassword()) {
       const userId = findUserIdForEmail(email);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
            })

          // send the JWT back to the user
          // TODO - multiple options available   
          res.send({
              bearerToken: jwtBearerToken
          })                           
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }
};

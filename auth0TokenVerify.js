
const jwt = require("jsonwebtoken");
const JwksRsa = require("jwks-rsa");

const  Auth0TokenVerify =async (req, res, next)=>{
    try {
      console.log("process.env.AUTH0_JWKS ")
      const token = req.headers.authorization.split(" ")[1];
      const kid = jwt.decode(token, { complete: true }).header.kid;
      const publicKey = (
        await JwksRsa({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: process.env.AUTH0_JWKS,
          //jwksUri: `https://dev-y44li12v4mldxxxxxx01m8wjx.us.auth0.com/.well-known/jwks.json`
        }).getSigningKey(kid)
      ).getPublicKey();
      const decode =  jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      });
      //  console.log("decode",decode)
      if (decode) {
        next();
      }
    } catch (err) {
      res.status(401).json({
        message: "Invalid Access Token",
        status: 401,
      });
      // next(err)
    }
  }


  module.exports = Auth0TokenVerify
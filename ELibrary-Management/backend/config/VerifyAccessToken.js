const jwt = require('jsonwebtoken');


async function VerifyAccessToken(req, res, token) {
  // const secret =process.env.SECRET_KEY;
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  // try {
  //   const decoded = jwt.verify(token, token);
  //   return { success: true, data: decoded };
  // } catch (error) {
  //   return { success: false, error: error.message };
  // }


  try {
    const token = req.header(tokenHeaderKey);

    if (!jwtSecretKey) {
        throw new Error('JWT secret key is not defined');
    }
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
        return res.send("Successfully Verified");
    } else {
        // Access Denied
        // @ts-ignore
        return res.status(401).send(error.message);
    }
} catch (error) {
    // Access Denied
    return res.status(401).send(error);
}
}

module.exports=VerifyAccessToken;

import jwt from 'jsonwebtoken';
import { DataRespond } from '../models/respond.model';

export default function auth(req, res, next) {

let respond : DataRespond
let statusCode : number
  const tokenArray =  req.header["Authorization"].split(" ")
  if(tokenArray.length != 2 && tokenArray == null){
	respond = {
		status : false,
		message: "Invalid access token"
	}
    statusCode = 400
  }
  else{
	const accessToken = tokenArray[1]
	if (accessToken) {
		try {
		  const decoded = jwt.verify(accessToken, 'SECRET_KEY');
		  // console.log(decoded);
		  req.accessTokenPayload = decoded;
		  next();
		} catch (err) {
		  console.log(err);
		  return res.status(401).json({
			message: 'Invalid access token.'
		  });
		}
	  } else {
		return res.status(401).json({
		  message: 'Access token not found.'
		});
	  }
  }
  return res.status(statusCode).json({
	message: 'Aasd'
  });
}


import express, { Express, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { UserService } from './services/a.service';
import UserModel,{UserType,_model} from './models/user.model'
import db from './config/connect';

const uri = "mongodb+srv://quang:1234567890@cluster0.n55cuss.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app: Express = express();
const port = process.env.PORT;
db.connect();
app.put('/', (req: Request, res: Response) => {
	let u = new UserService(_model);
	u.post()
	

	
});

app.listen(port, () => {
	let u = new UserService(_model);
	u.postData().then(res=>{
		if(res.modifiedCount == 0) {
			
		}
		console.log(res)
	})

    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});




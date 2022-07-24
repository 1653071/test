import mongoose, {Model, Document} from "mongoose"; 
import Product from "../models/user.model"
export class Repository<T extends Document>{
	a : Model<T>
	constructor(b : Model<T>){
		this.a = b
	}
	async post () : Promise<any>{
		return await this.a.find({})
	}
	async postData () : Promise<any>{
		    var myquery = { _id:new mongoose.Types.ObjectId("62dd7a9fbf7b0ad079b6878d")};
			var newvalues = { $set: {name: "Mickey11111" } };
			return await this.a.updateOne(myquery, newvalues)
		
	}

}
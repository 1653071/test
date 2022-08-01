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
	async postDataField (obj: JSON) : Promise<any>{
		    var myquery = { _id:new mongoose.Types.ObjectId("62dd7a9fbf7b0ad079b6878d")};
			var newvalues = { $set: obj };
			return await this.a.updateOne(myquery, newvalues)
		
	}
	async postData(obj: JSON):Promise<any>{
		await this.a.findOne({_id:new mongoose.Types.ObjectId("62dd7a9fbf7b0ad079b6878d")}).then(res=>{
            
		})
		
		var newvalues = { $set: obj };
		
	}

}
import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
   

})
export class Foo {
	name: string
}
export interface IUser {
	_id: mongoose.Types.ObjectId;
	name: string;
}
export type UserType = IUser & mongoose.Document;
export var _model = mongoose.model <UserType> ('users',User);

export default mongoose.model('Users', User);
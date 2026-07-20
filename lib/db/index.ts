import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Connection> {
	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI is not defined');
	}

	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI)
			.then((m) => {
				console.log('Connected to MongoDB');
				return m.connection;
			})
			.catch((err) => {
				cached.promise = null;
				console.error('Error connecting to MongoDB', err);
				throw err;
			});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default connectDB;

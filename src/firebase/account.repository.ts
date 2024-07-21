import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { app } from 'firebase-admin';

@Injectable()
export class AccountRepository {
	#db: FirebaseFirestore.Firestore;
	#collection: FirebaseFirestore.CollectionReference;

	constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
		this.#db = firebaseApp.firestore();
		this.#collection = this.#db.collection('user');
	}

	async findByUsername(username: string): Promise<any[]> {
		const users = await this.#collection.where('username', '==', username).get();
		if (users.empty) {
			throw new NotFoundException(`Account does not exist!`);
		}
		return users.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	}

	async findAll() {
		const snapshot = await this.#collection.get();
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	}
}
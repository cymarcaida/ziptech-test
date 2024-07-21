import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { app } from 'firebase-admin';
import { ProductDto } from 'src/product/dto/product.dto';

@Injectable()
export class ProductRepository {
	#db: FirebaseFirestore.Firestore;
	#collection: FirebaseFirestore.CollectionReference;

	constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
		this.#db = firebaseApp.firestore();
		this.#collection = this.#db.collection('product');
	}

	async create(item: ProductDto) {
		const docRef = await this.#collection.add(item);
		const doc = await docRef.get();
		return { id: doc.id, ...doc.data() };
	}

	async findAll() {
		const snapshot = await this.#collection.get();
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	}

	async find(id: string) {
		const doc = await this.#collection.doc(id).get();
		if (!doc.exists) {
			throw new NotFoundException('Product does not exist!');
		}
		return { id: doc.id, ...doc.data() };
	}

	async update(id: string, item: any) {
		try {
			await this.find(id)
			const docRef = this.#collection.doc(id);
			await docRef.update(item);
			const updatedDoc = await docRef.get();
			return { id: updatedDoc.id, ...updatedDoc.data() };
		} catch (error) {
			throw error;
		}
	}

	async remove(id: string) {
		try {
			await this.find(id)
			const docRef = await this.#collection.doc(id);
			await docRef.delete();
			return { message: "Product deleted successfully!" };
		} catch (error) {
			throw error;
		}
	}
}
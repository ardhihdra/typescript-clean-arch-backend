import * as admin from 'firebase-admin';
import { PostRepository } from './types';
import { Post } from '@src/entity';

const projectId = 'go-clean-arch-923f2';
const collectionName = 'posts';

admin.initializeApp({
  projectId: projectId,
});

const db = admin.firestore();

export class FirestoreRepository implements PostRepository {
  async Save(post: Post): Promise<Post> {
    const ref = db.collection(collectionName).doc();
    post.id = Number(ref.id);
    await ref.set(post);
    return post;
  }

  async FindAll(): Promise<Post[]> {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map((doc) => doc.data() as Post);
  }

  async FindByID(id: number): Promise<Post | undefined> {
    const snapshot = await db.collection(collectionName).where('ID', '==', id).get();
    if (snapshot.empty) {
      return undefined;
    } else {
      return snapshot.docs[0].data() as Post;
    }
  }
}

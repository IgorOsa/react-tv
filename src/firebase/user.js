import firestore from './config';

const createUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);

  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    favorites: [],
  };

  return docRef.set(userProfile);
};

export default createUserDocument;

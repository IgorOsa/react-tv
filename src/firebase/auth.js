import firebase from 'firebase/app';
import 'firebase/auth';

export const signup = async ({
  name, email, password,
}) => {
  const resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const { user } = resp;
  await user.updateProfile({ displayName: `${name}` });
  // await createUserDocument(user);
  return user;
};

export const logout = () => firebase.auth().signOut();

export const login = async ({ email, password }) => {
  const resp = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  return resp.user;
};

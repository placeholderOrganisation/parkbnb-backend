export const saveUserInDB = (profile: any, done: any) => {
  // insert into user collection/document
  console.log('profile', profile)
  done(null, profile)
};

export const saveUserInDB = (profile: any, done: any) => {
  const id = profile.id;
  const name = profile.displayName;
  const email = profile.emails ? extractEmail(profile) : null;
  // insert into user collection/document
  console.log('id, name, email', id, name, email)
  done(null, profile)
};

const extractEmail = (profile: any) => {
    const emailObject = profile.emails
    const email = emailObject[0].value
    
    return email
  }

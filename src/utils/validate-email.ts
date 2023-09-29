export const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.com$/;

  return emailPattern.exec(email);
};

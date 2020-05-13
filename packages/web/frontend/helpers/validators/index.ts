export function isEmail(value: string): boolean {
  const reEmail = /\S+@\S+\.\S+/;
  return reEmail.test(value);
}
export function isNotEmpty(value: string): boolean {
  return value.length > 0;
}
export function isPasswordsMatch(
  password: string,
  passwordConfirm: string,
): boolean {
  return password === passwordConfirm;
}

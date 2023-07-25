export const NameChat = (name: string, lastName: string) => {
  const firstName = name.trim().split(' ')[0]
  const signName = lastName
    .split(' ')[0]
    .substring(0, 1)
    .toUpperCase()
    .concat('.')

  return firstName.substring(firstName.lastIndexOf(' ')).concat(` ${signName}`)
}

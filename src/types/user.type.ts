export default interface IUser {
  id?: any | null,
  username?: string,
  nickname?: string | null,
  email: string,
  password: string,
  avatar_src?: string | null,
  roles?: Array<string>
}
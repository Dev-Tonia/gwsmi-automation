import { CreateUserDTOType } from "../../dtos/user/create-user.dto";

export function mapCreateUser(data: CreateUserDTOType) {
  return {
    fullName: data.fullName,
    username: data.username,
    password: data.password,
    role: data.role ?? "user",
    permissions: data.permissions ?? [],
  };
}

import bcrypt from "bcrypt";
import { create, deleteById, findUserByEmail, update } from "../db/models/User";
import { IRequest, IUser } from "user";
import { generateRandomPassword } from "../utils/randomPassword";
import { mailSender } from "../utils/sendMail";

/**
 * @param {*} email
 * @param {*} name
 * @param {*} password
 * @returns createdUser
 * @description 유저 존재하는지 체크한 후 유저 생성
 */
export const createUserService = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await create(name, email, hashedPassword);

  return createdUser;
};

export const updateUserService = async (
  userId: string,
  inputData: Partial<IUser>
) => {
  const updatedUser = await update(userId, inputData);
  if (!updatedUser) throw new Error("유저가 존재하지 않습니다.");
  return updatedUser;
};

export const deleteUserService = async (userId: string) => {
  const deletedUser = await deleteById(userId);

  if (!deletedUser) throw new Error("유저가 존재하지 않습니다.");

  return deletedUser;
};

export const resetPasswordService = async (userId: string, email: string) => {
  const newPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  mailSender(email, "비밀번호 초기화 이메일", newPassword);

  const updatedUser = await update(userId, { password: hashedPassword });

  return updatedUser;
};

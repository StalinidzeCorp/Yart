import { AxiosError } from 'axios';
import { UserSecret } from 'src/core/models/user-secret';
import { Login } from 'src/core/models/login-data';

import { SignUp } from '../../models/signup-data';

import { UserSecretDto } from '../../dtos/user-secret-dto';
import { userSecretMapper } from '../mappers/userSecretMapper';
import { http } from '../http';
import { UserSecretStorageService } from '../user-secret-storage-service';
import { CONFIG } from '../config';
import { signUpMapper } from '../mappers/signUpMapper';

/** Auth API. */
export namespace AuthApi {

  const loginUrl = 'auth/login/';
  const refreshSecretUrl = 'auth/token/refresh/';

  /**
   * Logs a user in with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<UserSecret> {
    const { data: userSecretDto } = await http.post<UserSecretDto>(`${CONFIG.apiUrl}/auth/signin`, loginData);
    const userSecret = userSecretMapper.fromDto(userSecretDto);

    return userSecret;
  }

  /**
   * Logs a user in with email and password.
   * @param signUpData Login data.
   */
  export async function signUp(signUpData: SignUp): Promise<UserSecret> {
    const { data: userSecretDto } = await http.post<UserSecretDto>(`${CONFIG.apiUrl}/auth/signup`, signUpMapper.toDto(signUpData));
    const userSecret = userSecretMapper.fromDto(userSecretDto);

    return userSecret;
  }

  /** Logs the current user out. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }

  /**
   * Refresh secret.
   * @param secret User secret.
   */
  export async function refreshSecret(secret: UserSecret): Promise<UserSecretDto> {
    const { data: newSecretDto } = await http.post<UserSecretDto>(
      refreshSecretUrl,
      userSecretMapper.toDto(secret),
    );

    return userSecretMapper.fromDto(newSecretDto);
  }
}

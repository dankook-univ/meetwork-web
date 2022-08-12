import { login } from '@/operations/auth/login';
import { logout } from '@/operations/auth/logout';
import { reissue } from '@/operations/auth/reissue';
import { signUp } from '@/operations/auth/sign-up';

const AuthApi = {
  login,
  logout,
  reissue,
  signUp,
};

export default AuthApi;

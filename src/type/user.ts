interface UserType {
  uuid: string;
  name: string;
  phone: number;
  email: string;
  password: string;
  roleType: string;
}

interface UserBodyType {
  name: string;
  phone: number;
  email: string;
  password: string;
  roleType: string;
}


interface JwtDecodeType {
  name: string;
  email: string;
  id: string;
  iat: string;
  exp: string;
}

export { UserType, UserBodyType, JwtDecodeType };

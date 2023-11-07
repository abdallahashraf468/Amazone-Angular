export interface Iuser {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumbers?: string[];
  photo?: File;
  address?: {
    city: string;
    postalCode: string;
    street: string;
  };
  password?: string;
  confirmPassword?: string;
}

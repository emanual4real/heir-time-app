export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  isAdmin: boolean;
  ownedProjects: string[];
  projects: string[];
  phoneNumber: string;
  address: string;
}

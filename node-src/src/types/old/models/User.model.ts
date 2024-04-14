export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  isAdmin?: boolean;
  ownedProjects?: string[];
  endowmentProjects?: string[];
  phoneNumber?: string;
  address?: string;
}

export interface IOrg {
  name: string;
  description?: string | null;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  postalCode: number;
  whatsAppNumber: string;
}

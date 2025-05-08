export interface Tenant {
  id: string; // Primary Key
  propertyId: string; // Foreign Key → Property.id
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  familyId: string; // To group tenants under the same family
  createdAt: Date;
  updatedAt: Date;
}

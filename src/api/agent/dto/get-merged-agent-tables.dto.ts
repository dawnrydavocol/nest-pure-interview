export interface ResPropertiesDto {
  id: string;
  agentId: string;
  address: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  tenants: {
    id: string; // Primary Key
    propertyId: string; // Foreign Key → Property.id
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    familyId: string; // To group tenants under the same family
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface ResAgentDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
  properties: ResPropertiesDto[];
  notes: {
    id: string; // Primary Key
    agentID: string; // Foreign Key → PropertyAgent.id
    propertyId: string; // Foreign Key → Property.id
    content: string;
    createdAt: Date;
  }[];
}

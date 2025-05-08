export interface Note {
  id: string; // Primary Key
  propertyId: string; // Foreign Key → Property.id
  content: string;
  createdAt: Date;
}

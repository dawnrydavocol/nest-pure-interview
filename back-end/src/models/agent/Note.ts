export interface Note {
  id: string; // Primary Key
  agentID: string; // Foreign Key → PropertyAgent.id
  propertyId: string; // Foreign Key → Property.id
  content: string;
  createdAt: Date;
}

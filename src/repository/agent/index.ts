import { InMemoryDatabase } from '../../databases/in-memory/InMemoryDB';
import { PorpertyAgent } from '../../models/agent/PropertyAgent';
import { Property } from '../../models/agent/Property';
import { Tenant } from '../../models/agent/Tenants';
import { Note } from '../../models/agent/Note';
const propertyAgentDb = new InMemoryDatabase<PorpertyAgent>();
const propertyDb = new InMemoryDatabase<Property>();
const tenantDb = new InMemoryDatabase<Tenant>();
const noteDb = new InMemoryDatabase<Note>();
export class AllInOneRepository {
  // PropertyAgent CRUD Operations
  PropertyAgent = {
    create: (agent: PorpertyAgent): void => {
      propertyAgentDb.set(agent.id, agent);
    },
    findById: (id: string): PorpertyAgent | undefined => {
      return propertyAgentDb.get(id);
    },
    findAll: (): PorpertyAgent[] => {
      return propertyAgentDb.getAll();
    },
    update: (id: string, updatedAgent: Partial<PorpertyAgent>): void => {
      const agent = propertyAgentDb.get(id);
      if (agent) {
        propertyAgentDb.set(id, { ...agent, ...updatedAgent });
      }
    },
    delete: (id: string): boolean => {
      propertyAgentDb.delete(id);
      // We will assume that this is operation always succeeds.
      return true;
    },
  };

  // Property CRUD Operations
  Property = {
    create: (property: Property): void => {
      propertyDb.set(property.id, property);
    },
    findById: (id: string): Property | undefined => {
      return propertyDb.get(id);
    },
    findAll: (): Property[] => {
      return propertyDb.getAll();
    },
    findByAgentId: (agentId: string): Property[] => {
      return propertyDb.getAll().filter((property) => property.agentId === agentId);
    },
    update: (id: string, updatedProperty: Partial<Property>): void => {
      const property = propertyDb.get(id);
      if (property) {
        propertyDb.set(id, { ...property, ...updatedProperty });
      }
    },
    delete: (id: string): void => {
      propertyDb.delete(id);
    },
  };

  // Tenant CRUD Operations
  Tenant = {
    create: (tenant: Tenant): void => {
      tenantDb.set(tenant.id, tenant);
    },
    findById: (id: string): Tenant | undefined => {
      return tenantDb.get(id);
    },
    findAll: (): Tenant[] => {
      return tenantDb.getAll();
    },
    findByPropertyId: (propertyId: string): Tenant[] => {
      return tenantDb.getAll().filter((tenant) => tenant.propertyId === propertyId);
    },
    update: (id: string, updatedTenant: Partial<Tenant>): void => {
      const tenant = tenantDb.get(id);
      if (tenant) {
        tenantDb.set(id, { ...tenant, ...updatedTenant });
      }
    },
    delete: (id: string): void => {
      tenantDb.delete(id);
    },
  };

  // Note CRUD Operations
  Note = {
    create: (note: Note): void => {
      noteDb.set(note.id, note);
    },
    findById: (id: string): Note | undefined => {
      return noteDb.get(id);
    },
    findAll: (): Note[] => {
      return noteDb.getAll();
    },
    findByPropertyId: (propertyId: string): Note[] => {
      return noteDb.getAll().filter((note) => note.propertyId === propertyId);
    },
    update: (id: string, updatedNote: Partial<Note>): void => {
      const note = noteDb.get(id);
      if (note) {
        noteDb.set(id, { ...note, ...updatedNote });
      }
    },
    delete: (id: string): void => {
      noteDb.delete(id);
    },
  };
}

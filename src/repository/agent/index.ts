import { InMemoryDatabase } from '../../databases/in-memory/InMemoryDB';
import { PorpertyAgent } from '../../models/agent/PropertyAgent';
import { Property } from '../../models/agent/Property';
import { Tenant } from '../../models/agent/Tenants';
import { Note } from '../../models/agent/Note';

export class Repository {
  private propertyAgentDb = new InMemoryDatabase<PorpertyAgent>();
  private propertyDb = new InMemoryDatabase<Property>();
  private tenantDb = new InMemoryDatabase<Tenant>();
  private noteDb = new InMemoryDatabase<Note>();

  // PropertyAgent CRUD Operations
  PropertyAgent = {
    create: (agent: PorpertyAgent): void => {
      this.propertyAgentDb.set(agent.id, agent);
    },
    findById: (id: string): PorpertyAgent | undefined => {
      return this.propertyAgentDb.get(id);
    },
    findAll: (): PorpertyAgent[] => {
      return this.propertyAgentDb.getAll();
    },
    update: (id: string, updatedAgent: Partial<PorpertyAgent>): void => {
      const agent = this.propertyAgentDb.get(id);
      if (agent) {
        this.propertyAgentDb.set(id, { ...agent, ...updatedAgent });
      }
    },
    delete: (id: string): void => {
      this.propertyAgentDb.delete(id);
    },
  };

  // Property CRUD Operations
  Property = {
    create: (property: Property): void => {
      this.propertyDb.set(property.id, property);
    },
    findById: (id: string): Property | undefined => {
      return this.propertyDb.get(id);
    },
    findAll: (): Property[] => {
      return this.propertyDb.getAll();
    },
    findByAgentId: (agentId: string): Property[] => {
      return this.propertyDb.getAll().filter((property) => property.agentId === agentId);
    },
    update: (id: string, updatedProperty: Partial<Property>): void => {
      const property = this.propertyDb.get(id);
      if (property) {
        this.propertyDb.set(id, { ...property, ...updatedProperty });
      }
    },
    delete: (id: string): void => {
      this.propertyDb.delete(id);
    },
  };

  // Tenant CRUD Operations
  Tenant = {
    create: (tenant: Tenant): void => {
      this.tenantDb.set(tenant.id, tenant);
    },
    findById: (id: string): Tenant | undefined => {
      return this.tenantDb.get(id);
    },
    findAll: (): Tenant[] => {
      return this.tenantDb.getAll();
    },
    findByPropertyId: (propertyId: string): Tenant[] => {
      return this.tenantDb.getAll().filter((tenant) => tenant.propertyId === propertyId);
    },
    update: (id: string, updatedTenant: Partial<Tenant>): void => {
      const tenant = this.tenantDb.get(id);
      if (tenant) {
        this.tenantDb.set(id, { ...tenant, ...updatedTenant });
      }
    },
    delete: (id: string): void => {
      this.tenantDb.delete(id);
    },
  };

  // Note CRUD Operations
  Note = {
    create: (note: Note): void => {
      this.noteDb.set(note.id, note);
    },
    findById: (id: string): Note | undefined => {
      return this.noteDb.get(id);
    },
    findAll: (): Note[] => {
      return this.noteDb.getAll();
    },
    findByPropertyId: (propertyId: string): Note[] => {
      return this.noteDb.getAll().filter((note) => note.propertyId === propertyId);
    },
    update: (id: string, updatedNote: Partial<Note>): void => {
      const note = this.noteDb.get(id);
      if (note) {
        this.noteDb.set(id, { ...note, ...updatedNote });
      }
    },
    delete: (id: string): void => {
      this.noteDb.delete(id);
    },
  };
}

import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PorpertyAgent } from '../../models/agent/PropertyAgent';
import { AllInOneRepository } from '../../repository/agent';
import { ResAgentDto, ResPropertiesDto } from './dto/get-merged-agent-tables.dto';
import { Property } from 'src/models/agent/Property';

@Injectable()
export class AgentService {
  constructor(private readonly repository: AllInOneRepository) {}

  create(createAgentDto: CreateAgentDto) {
    const newAgent: PorpertyAgent = {
      // We will just create a random ID for simplicity.
      id: Math.random().toString(36).substring(2, 15),
      firstName: createAgentDto.firstName,
      lastName: createAgentDto.lastName,
      email: createAgentDto.email,
      mobileNumber: createAgentDto.mobileNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.repository.PropertyAgent.create(newAgent);
    return newAgent;
  }

  findAll() {
    return this.repository.PropertyAgent.findAll();
  }

  findOne(id: string) {
    const agent = this.repository.PropertyAgent.findById(id);
    if (!agent) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    return agent;
  }

  update(id: string, updateAgentDto: UpdateAgentDto) {
    const existingAgent = this.repository.PropertyAgent.findById(id);
    if (!existingAgent) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    const updatedAgent: PorpertyAgent = {
      ...existingAgent,
      ...updateAgentDto,
      updatedAt: new Date(),
    };
    this.repository.PropertyAgent.update(id, updatedAgent);
    return updatedAgent;
  }

  private getMergedPropertiesTenants(properties: Property[]) {
    const mergedProperties: ResPropertiesDto[] = [];

    for (const property of properties) {
      const tenants = this.repository.Tenant.findByPropertyId(property.id);

      mergedProperties.push({
        id: property.id,
        agentId: property.agentId,
        address: property.address,
        notes: property.notes,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        tenants: tenants,
      });
    }
    return mergedProperties;
  }

  getMergedTables(agentID: string) {
    const agent = this.repository.PropertyAgent.findById(agentID);

    if (agent === undefined) {
      throw new Error(`Agent with ID ${agentID} not found`);
    }
    const properties = this.repository.Property.findByAgentId(agentID);

    const result: ResAgentDto = {
      id: agent.id,
      firstName: agent.firstName,
      lastName: agent.lastName,
      email: agent.email,
      mobileNumber: agent.mobileNumber,
      createdAt: agent.createdAt,
      updatedAt: agent.updatedAt,
      properties: this.getMergedPropertiesTenants(properties),
      notes: this.repository.Note.findByAgentId(agentID),
    };

    return result;
  }

  remove(id: string) {
    const deleted = this.repository.PropertyAgent.delete(id);
    if (!deleted) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    return { message: `Agent with ID ${id} has been removed` };
  }
}

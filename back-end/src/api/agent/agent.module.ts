import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { AllInOneRepository } from '../../repository/agent';

@Module({
  controllers: [AgentController],
  providers: [AgentService, AllInOneRepository],
  exports: [AllInOneRepository],
})
export class AgentModule {}

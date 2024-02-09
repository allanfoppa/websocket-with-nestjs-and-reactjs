import { Module } from '@nestjs/common';
import { PeopleGateway } from './people.gateway';
import { PeopleService } from './people.service';

@Module({
  providers: [PeopleGateway, PeopleService],
})
export class PeopleModule {}

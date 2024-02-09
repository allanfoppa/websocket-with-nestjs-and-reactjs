import { Module } from '@nestjs/common';

// APP
import { AppController } from './app.controller';
import { AppService } from './app.service';

// PEOPLE
import { PeopleModule } from './components/people/people.module';

@Module({
  imports: [
    PeopleModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}

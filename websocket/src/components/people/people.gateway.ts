import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PeopleService } from './people.service';

@WebSocketGateway({
  cors: true
})
export class PeopleGateway implements OnModuleInit, OnModuleDestroy {

  constructor(
    private readonly peopleService: PeopleService
  ){}

  @WebSocketServer()
  server: Server;

  connectionID: string;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.connectionID = socket.id
      console.log('Connected to people tunnel');
    });
  }

  onModuleDestroy() {
    this.server.on('desconnection', () => {
      console.log('Disconnected to people tunnel');
    });
  }

  @SubscribeMessage('fetchPeople') // Listen for 'fetchPeople' message from client
  async handleGetPeopleList(
    @ConnectedSocket() client: Socket
  ) {
    try {;
      client.emit('fetchPeopleResponse', this.peopleService.getPeople());
    } catch (error) {
      client.emit('responseError', {
        message: "Houve um erro"
      });
    }
  }

  @SubscribeMessage('addPerson') // Listen for 'addPerson' message from client
  async handleAddPerson(
    @MessageBody() name: string,
    @ConnectedSocket() client: Socket
  ) {
    try {
      let addedPerson = this.peopleService.addPerson(name);
      this.server.emit('addPersonResponse', {
        person: addedPerson,
        people: this.peopleService.getPeople()
      });
    } catch (error) {
      client.emit('responseError', {
        message: "Houve um erro"
      });
    }
  }

  @SubscribeMessage('editPerson') // Listen for 'editPerson' message from client
  async handleEditPerson(
    @MessageBody() body: { id: string, name: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      this.peopleService.updatePerson(body.id, body.name);
      this.server.emit('editPersonResponse', {
        people: this.peopleService.getPeople()
      });
    } catch (error) {
      client.emit('responseError', {
        message: "Houve um erro"
      });
    }
  }

  @SubscribeMessage('deletePerson') // Listen for 'deletePerson' message from client
  async handleDeletePerson(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket
  ) {
    try {
      let deletedPerson = this.peopleService.deletePerson(id);
      this.server.emit('deletePersonResponse', {
        person: deletedPerson,
        people: this.peopleService.getPeople()
      });
    } catch (error) {
      client.emit('responseError', {
        message: "Houve um erro"
      });
    }
  }

}



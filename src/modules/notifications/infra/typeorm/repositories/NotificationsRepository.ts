import { getMongoRepository, MongoRepository } from "typeorm";
//
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import Notification from "../schemas/Notification";

export default class NotificationsRepository
  implements INotificationsRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: MongoRepository<Notification>;

  constructor() {
    this.ormRepo = getMongoRepository(Notification, "mongo");
  }

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const tech = this.ormRepo.create(data);
    await this.ormRepo.save(tech);
    return tech;
  }
}

import { ServerResponse } from "http";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
//

// This is a decorator, it works like a function and the class is as argument
// Something like: Entity(class)
@Entity("events")
class Event {
  // Constructor is not needed since typeorm will do this behind the scenes
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user: string;

  @Column("timestamp with time zone")
  date: Date;
}

export default Event;

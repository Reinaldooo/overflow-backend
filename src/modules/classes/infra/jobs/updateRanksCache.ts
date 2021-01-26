import "dotenv/config";
import { getRepository, createConnection } from "typeorm";
//
import RedisCache from "@shared/container/providers/CacheProvider/implementations/RedisCache";
import Class from "../typeorm/entities/Class";

const redis = new RedisCache();

// This is a overkill for a small app, but as it grows, it's cool to cache
// complex queries that don't need to be accurate to the second.
export default {
  key: "UpdateRanks",
  options: {
    // Cron job to execute every 5 minutes
    repeat: { cron: "*/5 * * * *" },
  },
  async handle() {
    console.log("Rank", new Date().toLocaleString());

    await createConnection({
      name: "queue",
      type: "postgres",
      host: "localhost",
      port: 2452,
      username: "worker",
      password: "post0210",
      database: "overflow",
      synchronize: true,
      entities: ["src/modules/**/infra/typeorm/entities/*.ts"],
    });

    const ormRepo = getRepository(Class, "queue");

    const tutorsRank = await ormRepo
      .createQueryBuilder("class")
      .leftJoin("class.tutor", "tutor")
      .select("tutor.id", "tutorid")
      .addSelect("tutor.name", "name")
      .addSelect("COUNT(tutor.id)", "amount")
      .groupBy("tutorid")
      .orderBy("amount", "DESC")
      .limit(10)
      .getRawMany();

    const techsRank = await ormRepo
      .createQueryBuilder("class")
      .leftJoin("class.techs", "techs")
      .select("techs.name", "name")
      .addSelect("COUNT(*)", "amount")
      .groupBy("name")
      .orderBy("amount", "DESC")
      .limit(10)
      .getRawMany();

    const currTime = Date.now();

    await redis.save("tutorsRank", JSON.stringify(tutorsRank));
    await redis.save("tutorsRankTime", currTime);
    await redis.save("techsRank", JSON.stringify(techsRank));
    await redis.save("techsRankTime", currTime);
  },
};

import "../src/setupPebblebed";
import {
  IDSTestEntityIntId,
  TestEntityIntIdModel
} from "../src/entities/TestEntityIntId";
import { createNewTestEntityId } from "../src/entities/EntityCreation";
import IoRedisLib from "ioredis";
import { Pebblebed, PebblebedDefaultRedisCacheStore } from "pebblebed";
import { waitSeconds } from "../src/utility";

describe(`It should cache entities`, () => {
  beforeAll(() => {
    jest.setTimeout(20000);
    const redis = new IoRedisLib();
    Pebblebed.setCacheStore(new PebblebedDefaultRedisCacheStore(redis));
  });

  it("Should create, save and load the same exact entity (basic)", async cb => {
    const newEntity: IDSTestEntityIntId = {
      date: new Date(),
      tags: ["egg", "salad"],
      amount: 2032.2323,
    };

    const {
      savedEntities: [savedEntity],
      generatedIds: [genId],
    } = await TestEntityIntIdModel.save(newEntity)
      .enableCaching(true)
      .cachingSeconds(100)
      .returnSavedEntities()
      .generateUnsetIds()
      .run();

    newEntity.idThing = genId;
    newEntity[Pebblebed.ds.KEY] = savedEntity[Pebblebed.ds.KEY];

    expect(savedEntity).toEqual(newEntity);

    const cachedEntity = await TestEntityIntIdModel.load(genId).first().run();

    await waitSeconds(0.5);
    const loadedNoCacheEntity = await TestEntityIntIdModel.load(genId).enableCaching(false).first().run();

    expect(cachedEntity).toEqual(savedEntity);
    expect(cachedEntity).toEqual(loadedNoCacheEntity);

    delete cachedEntity.date;
    delete newEntity.date;
    delete loadedNoCacheEntity.date;
    delete savedEntity.date;
    delete newEntity.idThing;
    delete loadedNoCacheEntity.idThing;
    delete savedEntity.idThing;
    delete cachedEntity.idThing;
    delete newEntity[Pebblebed.ds.KEY];
    delete loadedNoCacheEntity[Pebblebed.ds.KEY];
    delete savedEntity[Pebblebed.ds.KEY];
    delete cachedEntity[Pebblebed.ds.KEY];

    expect({ newEntity, savedEntity, loadedNoCacheEntity }).toMatchSnapshot();

    await TestEntityIntIdModel.delete().idsOrKeys(genId).run();
    await waitSeconds(0.5);
    const afterDeleteEntity = await TestEntityIntIdModel.load(genId).enableCaching(true).first().run();

    expect(afterDeleteEntity).toEqual(null);

    cb();
  });

  it("Should create, save and load the same exact entity (with random props)", async cb => {
    const newEntity: IDSTestEntityIntId = {
      date: new Date(),
      tags: ["egg", "salad"],
      amount: 2032.2323,
      location: {
        latitude: 23.223,
        longitude: -33.2221,
      },
      object: { test: "something" },
      worthy: false,
      testSerialization:  {
        somethingElse: "serialized",
        time: new Date("2019-03-13T17:16:34.099Z"),
      },
    };

    const {
      savedEntities: [savedEntity],
      generatedIds: [genId],
    } = await TestEntityIntIdModel.save(newEntity)
      .enableCaching(true)
      .cachingSeconds(100)
      .returnSavedEntities()
      .generateUnsetIds()
      .run();

    const cachedEntity = await TestEntityIntIdModel.load(genId).first().run();

    await waitSeconds(0.5);
    const loadedNoCacheEntity = await TestEntityIntIdModel.load(genId).enableCaching(false).first().run();

    expect(cachedEntity).toEqual(savedEntity);
    expect(cachedEntity).toEqual(loadedNoCacheEntity);

    expect(newEntity.testSerialization).toEqual(cachedEntity.testSerialization);
    expect(newEntity.object).toEqual(cachedEntity.object);
    expect(newEntity.location).toEqual(cachedEntity.location);
    expect(newEntity.worthy).toEqual(cachedEntity.worthy);
    expect(newEntity.amount).toEqual(cachedEntity.amount);
    expect(newEntity.date).toEqual(cachedEntity.date);
    expect(newEntity.tags).toEqual(cachedEntity.tags);

    delete cachedEntity.date;
    delete newEntity.date;
    delete loadedNoCacheEntity.date;
    delete savedEntity.date;
    delete newEntity.idThing;
    delete loadedNoCacheEntity.idThing;
    delete savedEntity.idThing;
    delete cachedEntity.idThing;
    delete newEntity[Pebblebed.ds.KEY];
    delete loadedNoCacheEntity[Pebblebed.ds.KEY];
    delete savedEntity[Pebblebed.ds.KEY];
    delete cachedEntity[Pebblebed.ds.KEY];

    expect({ newEntity, savedEntity, loadedNoCacheEntity }).toMatchSnapshot();

    await TestEntityIntIdModel.delete().idsOrKeys(genId).run();
    await waitSeconds(0.5);
    const afterDeleteEntity = await TestEntityIntIdModel.load(genId).enableCaching(true).first().run();

    expect(afterDeleteEntity).toEqual(null);

    cb();
  });

  it("Should create, save and load the same exact entity (with deliberate undefined set)", async cb => {
    // const newEntity: IDSTestEntityIntId = createNewTestEntityId(true);
    const newEntity: IDSTestEntityIntId = {
      amount: 203222223.2322113,
      date: undefined,
      tags: undefined,
      location: undefined,
      object: undefined,
      worthy: undefined,
      testSerialization: undefined,
    };

    const {
      savedEntities: [savedEntity],
      generatedIds: [genId],
    } = await TestEntityIntIdModel.save(newEntity)
      .enableCaching(true)
      .cachingSeconds(100)
      .returnSavedEntities()
      .generateUnsetIds()
      .run();

    const cachedEntity = await TestEntityIntIdModel.load(genId).first().run();

    await waitSeconds(0.5);
    const loadedNoCacheEntity = await TestEntityIntIdModel.load(genId).enableCaching(false).first().run();

    delete newEntity.worthy;
    delete newEntity.object;
    delete newEntity.tags;
    newEntity.date = savedEntity.date;
    delete newEntity.location;

    expect(cachedEntity).toEqual(savedEntity);
    expect(cachedEntity).toEqual(loadedNoCacheEntity);

    expect(newEntity.testSerialization).toEqual(cachedEntity.testSerialization);
    expect(newEntity.object).toEqual(cachedEntity.object);
    expect(newEntity.location).toEqual(cachedEntity.location);
    expect(newEntity.worthy).toEqual(cachedEntity.worthy);
    expect(newEntity.amount).toEqual(cachedEntity.amount);
    expect(newEntity.date).toEqual(cachedEntity.date);
    expect(newEntity.tags).toEqual(cachedEntity.tags);

    await TestEntityIntIdModel.delete(savedEntity).run();
    await waitSeconds(0.5);
    const afterDeleteEntity = await TestEntityIntIdModel.load(genId).enableCaching(true).first().run();

    expect(afterDeleteEntity).toEqual(null);

    delete cachedEntity.date;
    delete newEntity.date;
    delete loadedNoCacheEntity.date;
    delete savedEntity.date;
    delete newEntity.idThing;
    delete loadedNoCacheEntity.idThing;
    delete savedEntity.idThing;
    delete cachedEntity.idThing;
    delete newEntity[Pebblebed.ds.KEY];
    delete loadedNoCacheEntity[Pebblebed.ds.KEY];
    delete savedEntity[Pebblebed.ds.KEY];
    delete cachedEntity[Pebblebed.ds.KEY];

    expect({ newEntity, savedEntity, loadedNoCacheEntity }).toMatchSnapshot();

    cb();
  });

  it("Should create, save and load the same exact entity (with deliberately set ID)", async cb => {
    // const newEntity: IDSTestEntityIntId = createNewTestEntityId(true);
    const newEntity: IDSTestEntityIntId = {
      idThing: "293939223",
      date: new Date(),
      tags: ["egg", "salad"],
      amount: 2032.2323,
      location: {
        latitude: 23.223,
        longitude: -33.2221,
      },
      object: { test: "something" },
      worthy: false,
      testSerialization:  {
        somethingElse: "serialized",
        time: new Date("2019-03-13T17:25:09.479Z"),
      },
    };

    const {
      savedEntities: [savedEntity],
    } = await TestEntityIntIdModel.save(newEntity)
      .enableCaching(true)
      .cachingSeconds(100)
      .returnSavedEntities()
      .run();

    const cachedEntity = await TestEntityIntIdModel.load(newEntity.idThing).first().run();

    await waitSeconds(0.5);
    const loadedNoCacheEntity = await TestEntityIntIdModel.load(newEntity.idThing).enableCaching(false).first().run();

    expect(cachedEntity).toEqual(savedEntity);
    expect(cachedEntity).toEqual(loadedNoCacheEntity);

    newEntity.idThing = savedEntity.idThing;
    await TestEntityIntIdModel.delete(newEntity).run();
    await waitSeconds(0.5);
    const afterDeleteEntity = await TestEntityIntIdModel.load(newEntity.idThing).enableCaching(true).first().run();

    expect(afterDeleteEntity).toEqual(null);

    expect(newEntity.testSerialization).toEqual(cachedEntity.testSerialization);
    expect(newEntity.object).toEqual(cachedEntity.object);
    expect(newEntity.location).toEqual(cachedEntity.location);
    expect(newEntity.worthy).toEqual(cachedEntity.worthy);
    expect(newEntity.amount).toEqual(cachedEntity.amount);
    expect(newEntity.date).toEqual(cachedEntity.date);
    expect(newEntity.tags).toEqual(cachedEntity.tags);

    delete cachedEntity.date;
    delete newEntity.date;
    delete loadedNoCacheEntity.date;
    delete savedEntity.date;

    expect({ newEntity, savedEntity, loadedNoCacheEntity }).toMatchSnapshot();

    cb();
  });
});

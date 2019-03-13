import { Pebblebed, PebblebedDefaultRedisCacheStore, DatastoreEntityKey } from "pebblebed";
import * as IoRedisLib from "ioredis";
const redis = new IoRedisLib();

export async function runCachingChecks() {
  const redisCacheStore = new PebblebedDefaultRedisCacheStore(redis);

  const keyOne: DatastoreEntityKey = Pebblebed.ds.key({
    path: [ "TestEntity", Pebblebed.dsLibrary.int("922337203685477"), "AnotherEntity", "123asd-eggs" ],
  });

  console.log(keyOne);

  const cacheKeyOne = redisCacheStore.createEntityCacheKey(keyOne);
  console.log(cacheKeyOne);

  const keyTwo: DatastoreEntityKey = Pebblebed.ds.key({
    path: [ "TestEntity", 922337203685477, "AnotherEntity", "123asd-eggs" ],
  });

  console.log(keyTwo);

  const cacheKeyTwo = redisCacheStore.createEntityCacheKey(keyTwo);
  console.log(cacheKeyTwo);

  console.log(`Equal? -> `, cacheKeyOne === cacheKeyTwo);
}
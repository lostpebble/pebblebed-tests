import { Pebblebed, types } from "pebblebed";
import { DefaultDateTimeNow, ICoordinates } from "../dataTypes/dataTypes";
import { IDSTestEntityBase } from "./EntityCreation";
import { reviveDateObjects } from "../utility";

export interface IDSTestEntityIntId extends IDSTestEntityBase{
  idThing?: string | number;
  color?: string;
}

const schema = Pebblebed.createSchema<IDSTestEntityIntId>({
  idThing: types.integerId(),
  color: types.string().default("red"),
  amount: types.double(),
  date: DefaultDateTimeNow,
  location: types.geoPoint(),
  tags: types.array(),
  worthy: types.boolean({
    indexed: false,
  }),
  object: types.object({
    indexed: false,
  }),
  testSerialization: types.serializedJson({
    indexed: false,
    reviver: reviveDateObjects,
  }),
  deepNumberArray: types.array({ indexed: false }),
  numberArray: types.array({ indexed: false }),
}).setDefaultMeta({
  nullValueIfUnset: false,
});

export const TestEntityIntIdModel = Pebblebed.createModel("TestEntityIntId", schema);

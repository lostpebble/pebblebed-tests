import { Pebblebed, types, } from "pebblebed";
import { DefaultDateTimeNow } from "../dataTypes/dataTypes";
import { IDSTestEntityBase } from "./EntityCreation";

export interface IDSTestEntityStringId extends IDSTestEntityBase {
  idThing: string;
  // date?: Date;
  // tags: string[];
  // amount?: number;
  // location?: ICoordinates;
  // worthy?: boolean;
}

const schema = Pebblebed.createSchema<IDSTestEntityStringId>({
  idThing: types.stringId(),
  amount: types.double({
    indexed: false,
  }),
  date: DefaultDateTimeNow,
  location: types.geoPoint(),
  tags: types.array().required(),
  worthy: types.boolean(),
});

// export const TestEntityStringIdModel = new PebblebedModel("TestEntityStringId", schema);
export const TestEntityStringIdModel = Pebblebed.createModel("TestEntityStringId", schema);

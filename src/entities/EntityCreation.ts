import { sampleSize, random } from "lodash";
import { ICoordinates } from "../dataTypes/dataTypes";

export interface IDSTestEntityBase {
  date?: Date;
  tags: string[];
  amount?: number;
  location?: ICoordinates;
  worthy?: boolean;
  object?: object;
  testSerialization?: {
    time: Date;
    [key: string]: any;
  };
  numberArray?: number[];
  deepNumberArray?: { num: number; }[];
}

const tags = ["egg", "salad", "green", "blue", "ham", "great", "dont"];
const trueOrFalse = () => random(1) === 1;

export function createNewTestEntityId(withAll: boolean = false): IDSTestEntityBase {
  const numberArray = [123123, 222.233, 99595, 2220031];
  const deepNumberArray = [{ num: 23123.22 }, { num: 239992 }];

  return {
    amount: random(999999, true),
    date: withAll || trueOrFalse() ? new Date() : undefined,
    tags: sampleSize(tags, random(1, 5)),
    location: withAll || trueOrFalse()
      ? {
        longitude: random(-90, 90, true),
        latitude: random(-90, 90, true),
      }
      : undefined,
    worthy: withAll || trueOrFalse() ? trueOrFalse() : undefined,
    object: withAll || trueOrFalse() ? { test: "something" } : undefined,
    testSerialization: withAll || trueOrFalse() ? { time: new Date(), serialized: "serialized-test-thing" } : undefined,
    numberArray,
    deepNumberArray,
  };
}

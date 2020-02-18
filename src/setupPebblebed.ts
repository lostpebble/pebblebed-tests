import { Datastore } from "@google-cloud/datastore";
import { Pebblebed } from "pebblebed";

export const datastore = new Datastore();

Pebblebed.connectDatastore(datastore);
Pebblebed.setDefaultNamespace("pebblebed-test-namespace");

import { Datastore } from "@google-cloud/datastore";
import { Pebblebed } from "pebblebed";

const datastore = new Datastore();

Pebblebed.connectDatastore(datastore);
Pebblebed.setDefaultNamespace("pebblebed-test-namespace");

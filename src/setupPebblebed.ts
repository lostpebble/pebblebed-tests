import * as datastoreLib from "@google-cloud/datastore";
// import { Pebblebed } from "../../src";
import { Pebblebed } from "pebblebed";

const datastore = datastoreLib();

Pebblebed.connectDatastore(datastore);
Pebblebed.setDefaultNamespace("pebblebed-test-namespace");

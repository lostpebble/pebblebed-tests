import { Pebblebed, types } from "pebblebed";
import joi from "joi";

interface ITagValueHolder<T> {
  t: string;
  v: T;
}

export interface IDSNode {
  id: string;
  type: string;
  tagCat: string[];
  tagAtt: string[];
  tagMed: string[];
  tagIds: string[];
  tagNums: ITagValueHolder<number>[];
  tagDates: ITagValueHolder<Date>[];
  nodeLinks: string[];
  dateCreated?: Date;
  dateUpdated?: Date;
}

const nodeSchema = Pebblebed.createSchema<IDSNode>({
  id: types.stringId(),
  type: types.string({ required: true }),
  tagCat: types.array().items(joi.string()),
  tagAtt: types.array().items(joi.string()),
  tagMed: types.array().items(joi.string()),
  tagIds: types.array().items(joi.string()),
  tagNums: types.array().items(joi.object().keys({
    t: joi.string().required(),
    v: joi.number().integer().required(),
  })),
  tagDates: types.array().items(joi.object().keys({
    t: joi.string().required(),
    v: joi.date().required(),
  })),
  nodeLinks: types.array().items(joi.string()),
  dateCreated: types.specialized.dateTimeCreated(),
  dateUpdated: types.specialized.dateTimeUpdated(),
});

const NodeModel = Pebblebed.createModel("Node", nodeSchema);

async function _subObjectSaveAndQuery() {
  const newNode: IDSNode = {
    id: "movie/johnny-english-2018",
    type: "movie",
    tagCat: [
      "ct_c_fil",
      "ct_t_fil_typ_fea",
      "ct_t_gen_cro_adv",
      "ct_t_gen_cro_com",
      "ct_t_gen_cro_act"
    ],
    tagAtt: [],
    tagMed: [
      "me_v",
      "me_v_yt"
    ],
    tagIds: [
      "me_v_yt_id_9cBN9_9oK4A",
    ],
    tagNums: [],
    tagDates: [],
    nodeLinks: [
      "company/studio-canal-uk",
      "company/studio-canal-uk/pro",
      "person/rowan-atkinson",
      "person/rowan-atkinson/act",
      "person/rowan-atkinson/pro"
    ]
  }
}
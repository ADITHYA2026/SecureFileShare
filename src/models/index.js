// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FileMeta } = initSchema(schema);

export {
  FileMeta
};
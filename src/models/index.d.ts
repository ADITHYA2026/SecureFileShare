import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerFileMeta = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FileMeta, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly filename: string;
  readonly fileKey: string;
  readonly expiry: string;
  readonly password?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFileMeta = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FileMeta, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly filename: string;
  readonly fileKey: string;
  readonly expiry: string;
  readonly password?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FileMeta = LazyLoading extends LazyLoadingDisabled ? EagerFileMeta : LazyFileMeta

export declare const FileMeta: (new (init: ModelInit<FileMeta>) => FileMeta) & {
  copyOf(source: FileMeta, mutator: (draft: MutableModel<FileMeta>) => MutableModel<FileMeta> | void): FileMeta;
}
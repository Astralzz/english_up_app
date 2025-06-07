/**
 * Verb model
 * @module Verb
 * @description This module defines the Verb model and its properties.
 */
interface Verb {
  readonly no: number;
  type: VerbTypeType;
  simple_form: string;
  third_person: string;
  simple_past: string;
  past_participle: string;
  gerund: string;
  meaning: Array<string>;
}

/**
 * Verb type
 * @module VerbTypeType
 * @description This module defines the VerbTypeType type.
 */
export type VerbTypeType = 'I' | 'R';

/**
 * Paginate verbs type
 * @module PaginateVerbsType
 * @description This module defines the PaginateVerbsType type.
 */
export type PaginateVerbsType = {
  data: Verb[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export default Verb;

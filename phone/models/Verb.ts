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

export type VerbTypeType = "I" | "R";

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

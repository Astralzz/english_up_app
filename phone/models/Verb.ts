/**
 * Verb model
 * @module Verb
 * @description This module defines the Verb model and its properties.
 */
interface Verb {
  readonly no: number; // Number of the verb
  type: VerbTypeType; // Type of the verb
  simple_form: string; // Simple form of the verb
  third_person: string; // Third person of the verb
  simple_past: string; // Simple past of the verb
  past_participle: string; // Past participle of the verb
  gerund: string; // Gerund of the verb
  meaning: string[]; // Meaning of the verb
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

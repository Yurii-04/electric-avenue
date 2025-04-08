export type MappedAttribute = {
  attributeId: string;
  optionValueId: string;
};

export type RelevantAttributes = {
  name: string;
  attributeOptions: string[];
};

export type FilterRequest = Record<string, string | string[]>;

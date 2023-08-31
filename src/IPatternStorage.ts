import { IPatternDefinition, Namespaces } from "./definition";

import { ComponentType } from "react";
import Pattern from "./Pattern";
import PatternVariant from "./PatternVariant";

export default interface IPatternStorage {
  loadPattern(patternId: string): Pattern;
  loadVariant(patternId: string, variantId: string): PatternVariant;
  createDefinitions(definition: any): void;
  addDefinition(id: string, pattern: IPatternDefinition): void;
  getPatternIds(): string[];
  getComponent(useVal: string): ComponentType;
  setNamespaces(namespaces: Namespaces): void;
  createComponentStorageFromContext(
    contexts: __WebpackModuleApi.RequireContext[]
  ): void;
  createDefinitionsFromMultiContext(
    contexts: __WebpackModuleApi.RequireContext[]
  ): void;
}

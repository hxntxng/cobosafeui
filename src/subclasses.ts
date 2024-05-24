import { BaseOwnable }from "./ownable";

const subclasses: Record<string, typeof BaseOwnable> = {};

// Function to register a subclass
export function registerSubclass(className: string, subclass: typeof BaseOwnable) {
  subclasses[className] = subclass;
}

// Function to retrieve a subclass by class name
export function getSubclass(className: string): typeof BaseOwnable | undefined {
  return subclasses[className];
}

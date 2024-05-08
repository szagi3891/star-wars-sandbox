import { autoMapKeyAsString } from "../utils/AutoMap";

export class Api {
  protected nominal?: never;
  public constructor() {}

  public [autoMapKeyAsString](): string {
    return "";
  }
}

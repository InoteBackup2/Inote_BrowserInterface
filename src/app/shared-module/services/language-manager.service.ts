import { Lang } from "../enums/lang.enum";
import { Injectable } from "@angular/core";
import { fr } from "../languages/fr.map";

@Injectable({
  providedIn: "root",
})
export class LanguageManagerService {
  private currentLanguage: Lang = Lang.EN; // Default language

  constructor() {}

  pickMsg(key: string): string {
    let value: string | undefined;

    switch (this.currentLanguage) {
      case Lang.FR:
        value = fr.get(key);
        break;

      default:
        value = key;
        break;
    }

    if (!value)
      throw new Error(
        `pickMsg: the requested value '${key}' does not exist in the table of current language`
      );

    return value;
  }

  setCurrentLanguage(value: Lang) {
    this.currentLanguage = value;
  }

  getCurrentLanguage(): Lang {
    return this.currentLanguage;
  }
}

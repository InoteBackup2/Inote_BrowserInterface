import { Lang } from '../enums/lang.enum';
import { LanguageManagerService } from './../services/language-manager.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {

  constructor(private languageManagerService : LanguageManagerService){}

onSelectEnglish() {
  this.languageManagerService.setCurrentLanguage(Lang.EN);
 
}
onSelectFrench() {
  this.languageManagerService.setCurrentLanguage(Lang.FR);
 
}

}

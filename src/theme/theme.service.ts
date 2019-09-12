import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { themes, themes_meta } from './arsnova-theme.const';
import { Theme } from './Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeName = localStorage.getItem('theme');
  private activeThem = new BehaviorSubject(this.themeName);
  private themes: Theme[] = [];

  constructor() {
    // tslint:disable-next-line:forin
    for (const k in themes) {
      this.themes.push(new Theme(
        k,
        themes_meta[k]['name'],
        themes_meta[k]['description'],
        themes[k]['--primary'],
        themes[k])
      );

    }
  }

  public getTheme() {
    return this.activeThem.asObservable();
  }

  public activate(name) {
    this.activeThem.next(name);
    localStorage.setItem('theme', name);
  }

  public getThemes(): Theme[] {
    return this.themes;
  }
}

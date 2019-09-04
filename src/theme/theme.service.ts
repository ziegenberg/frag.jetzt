import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {themes} from './arsnova-theme.const';
import {ThemeObj} from './ThemeObj';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeName = localStorage.getItem('theme');
  private activeThem = new BehaviorSubject(this.themeName);

  constructor() { }

  public getTheme() {
    return this.activeThem.asObservable();
  }

  public activate(name) {
    this.activeThem.next(name);
    localStorage.setItem('theme', name);
  }

  public getThemes():ThemeObj[]{
    let tmp:ThemeObj[]=[];
    for(let k in themes){
      console.log(themes[k]);
      tmp.push(new ThemeObj(k,themes[k]['--primary'],themes[k]));
    }
    return tmp;
  }

}

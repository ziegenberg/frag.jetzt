


export class Contrast{

  public static contrast(){
    (<HTMLElement[]>Array.from(document.getElementsByTagName('*'))).forEach(e=>{
      e.style.backgroundColor='#000000';
      e.style.color='#FFFFFF';
    });
  }

}

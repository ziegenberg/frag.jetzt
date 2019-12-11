


export class DebugBorder{

  public static border(key:string){
    let isActive:boolean=true;
    const style:HTMLStyleElement=document.createElement('style');
    style.appendChild(document.createTextNode(
      'body *:hover{background-color:rgba(60,114,201,0.01)} ' +
      'body *{box-shadow:inset 0px 0px 0px 1px rgba(0,0,0,0.2);}'));
    document.getElementsByTagName('head')[0].appendChild(style);
    window.addEventListener('keydown',(k)=>{
      if(k.key!==key)return;
      if(isActive){
        document.getElementsByTagName('head')[0].removeChild(style);
        isActive=false;
      }
      else{
        document.getElementsByTagName('head')[0].appendChild(style);
        isActive=true;
      }
    });
  }

}

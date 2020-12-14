declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';


declare interface Window {
  electron: {
    //doThing(): void;
    openNewWindow(): void;    
  };
  myapi;
}

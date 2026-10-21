import {createContext,useContext,useState,type ReactNode} from "react";
type UIValue={isSlideMenuOpen:boolean;isSearchOpen:boolean;openSlideMenu:()=>void;closeSlideMenu:()=>void;openSearch:()=>void;closeSearch:()=>void};const UIContext=createContext<UIValue|undefined>(undefined);
export function UIProvider({children}:{children:ReactNode}){const [isSlideMenuOpen,setMenu]=useState(false);const [isSearchOpen,setSearch]=useState(false);return <UIContext.Provider value={{isSlideMenuOpen,isSearchOpen,openSlideMenu:()=>setMenu(true),closeSlideMenu:()=>setMenu(false),openSearch:()=>setSearch(true),closeSearch:()=>setSearch(false)}}>{children}</UIContext.Provider>}
export function useUI(){const c=useContext(UIContext);if(!c)throw new Error("useUI requires UIProvider");return c}

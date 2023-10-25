import { get } from "svelte/store";
import { dbService } from "../../db/service.js";
import { Theme } from "../../db/types.js";
import { activeTheme, menuColor, noteColor, themeColor } from "../stores/colorTheme.js";
import { db } from "../../db/index.js";

class ThemesService {
    async createTheme(){
        const note_color = get(noteColor)
        const menu_color = get(menuColor)
        
        if (!this.isValidHexColor(note_color) || !this.isValidHexColor(menu_color)) {
            return
        }
        const theme = new Theme({note_color, menu_color})
        // console.log(theme);
        
       const created = await dbService.settings.create(theme)
       console.log(await dbService.settings.getOne(created.lastInsertId));
       
        const currentTheme = get(activeTheme)
        const setInActive = new Theme({...currentTheme, active: 0})
        console.log('active',setInActive);
        
        await dbService.settings.save(setInActive)
        await this.getAll()
    }
    async save(theme:Theme){
        const currentlyActiveTheme = get(themeColor).find(theme => theme.active === 1)
        if (currentlyActiveTheme?.id === theme.id) {
            return
        }
        await dbService.settings.save(new Theme({...currentlyActiveTheme, active:0}))
        await dbService.settings.save(new Theme({...theme, active:1}))
        await this.getAll()

    }

    async getAll(){
        const _themes = await dbService.settings.getAll()
        themeColor.set(_themes)
        const active = _themes.find(theme => theme.active === 1) ?? _themes[0]
        activeTheme.set(active)
    }
    isValidHexColor(hexStr: string): boolean {
        // Remove "#" if present
        if (hexStr.startsWith('#')) {
          hexStr = hexStr.slice(1);
        }
      
        // Check for valid length
        if (hexStr.length !== 3 && hexStr.length !== 6) {
          return false;
        }
      
        // Check for valid characters
        const validChars = new Set('0123456789ABCDEF');
        hexStr = hexStr.toUpperCase();
        for (const char of hexStr) {
          if (!validChars.has(char)) {
            return false;
          }
        }
      
        return true;
      }
      
}


export const themesService = new ThemesService()
import { get } from "svelte/store";
import { Template, TemplateDTO } from "../../db/types.js";
import * as State from "../stores/template.js";
import { dbService } from "../../db/service.js";
import { alertState } from "../stores/alert.js";

class TemplateService {
  async addTemplate() {
    const tag = get(State.tag);
    const title = get(State.title);
    const content = get(State.content);
    const newTemplate = new Template({ tag, title, content });
    const made = await dbService.templates.create(newTemplate);
    return made;
  }

  async deleteTemplate(id: number) {
    const deleted = await dbService.templates.deleteById(id);
  }

  async update(){
    const tag = get(State.tag);
    const title = get(State.title);
    const content = get(State.content);
    const id = get(State.activeTemplate)?.id
    if (!id) {
      return
    }
    const newTemplate = new TemplateDTO({id, tag, title, content });
    
    const updated = await dbService.templates.update(newTemplate)
      if (updated.rowsAffected === 1) {
        alertState.set({
          color: "green",
          text: "Template Saved!",
          visible: true,
        });
      }
    
  }
}

export const templateService = new TemplateService();

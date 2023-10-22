import { get } from "svelte/store";
import { Template } from "../../db/types.js";
import * as State from "../stores/template.js";
import { dbService } from "../../db/service.js";

class TemplateService {
  async addTemplate() {
    const tag = get(State.tag);
    const title = get(State.title);
    const content = get(State.content);
    const newTemplate = new Template({ tag, title, content });
    const made = await dbService.templates.create(newTemplate);
    return made;
  }

  async deleteTemplate(id: string) {
    const deleted = await dbService.templates.deleteById(id);
  }
}

export const templateService = new TemplateService();

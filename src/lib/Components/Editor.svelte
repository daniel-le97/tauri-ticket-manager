<script lang="ts">
    import Editor from '@tinymce/tinymce-svelte';
    import { tinymceConfig  as conf} from '../../tinymce';
    import { get, writable } from 'svelte/store';
    import { appState } from '../stores/appState';
    import { onDestroy, onMount } from 'svelte';
    import { noteService } from '../services/notes.js';
    import { window } from '@tauri-apps/api';


    const startingContent = writable('')
    let subbed: Function
    onMount(async () => {
        try {
            // Fetch the content from the database
            const dbDescription = await noteService.getCurrentNote();

            // If content is successfully fetched, set it as the default value
            if (dbDescription && dbDescription.description) {
                startingContent.set(dbDescription.description);

            } else {
                // Handle the case where no data is retrieved
                // You could set a default value or handle it as needed
                startingContent.set("Default content if database is empty");
            }
        subbed = startingContent.subscribe(value => {
          console.log(value);
          appState.update((state) => ({...state, description: value}))
    })

    
        } catch (error) {
            // Handle any errors that occur during the database fetch
            console.error("Error fetching data from the database:", error);
        }
    });

    onDestroy(() => {
      subbed ? subbed() : ''
    })
</script>
<div>
 
  <textarea bind:value={$startingContent} class=" "></textarea>

</div>
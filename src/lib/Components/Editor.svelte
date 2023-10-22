<script lang="ts">
    import Editor from '@tinymce/tinymce-svelte';
    import { tinymceConfig  as conf} from '../../tinymce';
    import { writable } from 'svelte/store';
    import { appState } from '../stores/appState';
    const value = writable('')
    value.subscribe(value => {
        appState.update((state) => ({...state, description: value}))
        console.log($appState.description);
        
    })
    
</script>
<div>
      <Editor bind:value={$value}  {conf} scriptSrc="../../../node_modules/tinymce/tinymce.js"/>
      <div>{@html $value}</div>
      <!-- <textarea bind:value={value}></textarea> -->
 </div>
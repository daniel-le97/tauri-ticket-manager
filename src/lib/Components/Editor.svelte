<script>
    import Editor from '@tinymce/tinymce-svelte';
    import { tinymceConfig } from '../../tinymce';
    import { writable } from 'svelte/store';
    let value =  writable('some nice content')
    value.subscribe((value) => {
        console.log(value);
    })
    let conf = tinymceConfig
</script>
<div>
      <Editor bind:value={$value}  {conf} scriptSrc="../../../node_modules/tinymce/tinymce.js"/>
      <div>{@html $value}</div>
      <!-- <textarea bind:value={value}></textarea> -->
 </div>
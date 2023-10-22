export const tinymceConfig = {
    // selector: "textarea",
    height: "75vh",
    width: "100vw",
    statusbar: false,
    resize: false,
    min_height: 450,
    max_height: 1000,
    branding:false,
    promotion:false,
    autoresize_bottom_margin: 0,
    autosave_ask_before_unload: true,
    skin: 'CUSTOM',
    content_css: 'CUSTOM',
    theme: 'silver',
    highlight_on_focus: true,
    plugins: [ "visualblocks", "directionality", "wordcount", "lists", "accordion", "quickbars", "codesample", "importcss",
        "template", "code", "searchreplace", "nonbreaking", "image", "autoresize", "autosave", "insertdatetime",
        "link", "table", "charmap", "advlist", "preview", "anchor", "autolink", "pagebreak", "fullscreen", "visualchars",
        "save", "emoticons", "help", "media" ],
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | restoredraft",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    mergetags_list: [
      { value: "First.Name", title: "First Name" },
      { value: "Email", title: "Email" },
    ]
  }
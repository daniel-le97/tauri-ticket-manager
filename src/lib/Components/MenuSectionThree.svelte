<script lang="ts">
  let fontsize = 24;
  let notesTextarea = "";
  let phoneNumber = "Phone#";
  let ticketNumber = "Ticket#";
  let assetTag = "Asset#";
  let userEmail = "user";
  /**
   * @type {string | null}
   */
  export let clipBoardText: string | null;
  console.log(clipBoardText);

  const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g; // Matches phone numbers
  const ticketRegex = /Ticket:\s?(\w+)/g; // Matches ticket numbers (assuming a format like "Ticket: ABC123")
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g; // Matches email addresses

  function watchClipboardChanges() {
    // Check for changes in clipBoardText
    if (clipBoardText) {
      // Check and update phone number
      const phoneMatches = clipBoardText.match(phoneRegex);
      phoneNumber = phoneMatches ? phoneMatches[0] : "Phone#";

      // Check and update ticket number
      const ticketMatches = clipBoardText.match(ticketRegex);
      ticketNumber = ticketMatches ? ticketMatches[0] : "Ticket#";

      // Check and update asset tag (you can add the asset tag regex and update logic here)
      // const assetMatches = clipBoardText.match(assetRegex);
      // assetTag = assetMatches ? assetMatches[0] : "Asset#";

      // Check and update user email
      const emailMatches = clipBoardText.match(emailRegex);
      userEmail = emailMatches ? emailMatches[0] : "user";
    }
  }

  // Watch for changes in clipBoardText
  $: {
    if (clipBoardText) {
      watchClipboardChanges();
    }
  }
</script>

<div class="menu-section1">
  <ul class="line-row">
    <li class="line-item"><input type="text" value="Classified?" /></li>
    <li class="line-item">
      <input type="text" bind:value={userEmail} />
    </li>

    <li class="line-item">
      <input type="text" bind:value={assetTag} />
    </li>

    <li class="line-item">
      <input type="text" bind:value={ticketNumber} />
    </li>
    <li class="line-item">
      <input type="text" bind:value={phoneNumber} />
    </li>
  </ul>

</div>

<style>
  input {
    border: 2px solid #000;
    outline: none;
    padding: 6px;
    background: transparent;
    border-radius: 0px;
    outline: none;
    border: none;
    font-weight: 400;
    background-color: #8b5cf6;
    cursor: pointer;
    width: auto; /* Set the width to automatically grow as needed */
    max-width: 100px;
  }
  input:focus {
    border: #ff5733 2px solid;
    outline: none;
  }
  .menu-section1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }


  .line-row {
    display: flex;
    padding: 2.5px;
    margin-top: 2px;
    margin-bottom: 2px;
    list-style: none;
  }
  .line-item {
    margin-left: 1px;
    margin-right: 1px;
    background-color: #8b5cf6;
    cursor: pointer;
    border: 2px solid #000;
  }
</style>

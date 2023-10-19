<script>
  // your script goes here
</script>

<div class="side-bar">
  <ul class="side-bar-menu">
    <li>
      <img
        class="side-bar-icon"
        src="https://cdn-icons-png.flaticon.com/128/1/1176.png"
        alt=""
      />
    </li>
    <li>
      <img
        class="side-bar-icon"
        src="https://cdn-icons-png.flaticon.com/128/1/1176.png"
        alt=""
      />
    </li>
    <li>
      <img
        class="side-bar-icon"
        src="https://cdn-icons-png.flaticon.com/128/1/1176.png"
        alt=""
      />
    </li>
    <li>
      <img
        class="side-bar-icon"
        src="https://cdn-icons-png.flaticon.com/128/1/1176.png"
        alt=""
      />
    </li>
  </ul>
</div>

<style>
  .side-bar {
    width: 2%;
    background-color: #ff5733;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }

  .side-bar:hover {
    width: 5%;
    transition: all 0.25s ease;
  }

  .side-bar:hover .side-bar-menu {
    /* Your styles for .side-bar-menu here */
    width: auto; /* For example, change the width to 100% */
    transition: all 0.25s ease;
    opacity: 1;
  }

  .side-bar-menu {
    display: none;

    opacity: 0;
    padding-left: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.25s ease;
    list-style: none;
  }

  .side-bar-icon {
    margin: 8px 0px 8px 0px;
    width: 16px;
    height: 16px;
  }
</style>

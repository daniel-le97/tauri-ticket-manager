<!-- DynamicDiagonalButton.svelte -->
<script>
      export let leftColor = '#ff5733';
  export let rightColor = '#33d9ff';
  
    function updateColors() {
      const newLeftColor = prompt('Enter a color for the left side (e.g., red):');
      if (newLeftColor) {
        leftColor = newLeftColor;
      }
  
      const newRightColor = prompt('Enter a color for the right side (e.g., blue):');
      if (newRightColor) {
        rightColor = newRightColor;
      }
    }
  </script>
  
  <style>
    .diagonal-button {
      background: linear-gradient(135deg, leftColor 50%, rightColor 50%);
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    .left-text {
      flex: 1;
      text-align: left;
    }
  
    .right-text {
      flex: 1;
      text-align: right;
    }
  </style>
  
  <div class="diagonal-button">
    <div class="left-text">Note Color</div>
    <div class="right-text">Menu Color</div>
  </div>
  
  <button on:click={updateColors}>Change Colors</button>
  

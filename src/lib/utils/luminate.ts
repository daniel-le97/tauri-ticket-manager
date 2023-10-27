 export function getContrastColor(hexColor: string) {
  // Function to convert a hex color to its RGB components
  function hexToRGB(hex: string) {
    // Remove the hash (#) if it exists
    hex = hex.replace(/^#/, "");

    // Parse the hex color values (r, g, b)
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }

  // Calculate the relative luminance of a color
  function calculateLuminance(r: number, g: number, b: number) {
    // Formula to calculate relative luminance for RGB colors
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // Get RGB components from the hex color
  const { r, g, b } = hexToRGB(hexColor);

  // Calculate the relative luminance of the background color
  const backgroundLuminance = calculateLuminance(r, g, b);

  // Decide on the text color based on the luminance
  if (backgroundLuminance > 128) {
    // Use a dark text color for light backgrounds
    return "#000000";
  } else {
    // Use a light text color for dark backgrounds
    return "#FFFFFF";
  }
}

// Give ratings colors depending on how high or low they are
export function getRatingColor(rating) {
  if (rating < 3) return "#dbac07";
  else if (rating < 4) return "#3ab757";
  else if (rating < 5.1) return "#267e3e";
  else return "#7F7D9C"; // yellow, lime, pine, or gray
}

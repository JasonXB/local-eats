// input props that remove focus from an input field once the user hits enter while typing on it
// this closes the keyboard when typing on mobile, improving UX
export const blurInputField = {
  onKeyPress: function (e) {
    if (e.key == "Enter") e.target.blur();
  },
};

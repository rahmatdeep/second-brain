export function random(len: number): string {
  let options = "fkgjnajkgnesarikgnhosergn";
  let optionsLength = options.length;
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * optionsLength)];
  }
  return ans;
}

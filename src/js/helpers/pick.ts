export default function pick(obj: object = {}, keys: string[] = []) {
  return keys.reduce((p, c) => {
    p[c] = obj[c];
    return p;
  }, {});
}

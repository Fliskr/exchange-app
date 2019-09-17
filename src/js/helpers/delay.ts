export default function delay(duration: number): Promise<unknown> {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
  return promise;
}

declare module "bs58" {
  function encode(buffer: Uint8Array | number[]): string;
  function decode(str: string): Uint8Array;
  export default { encode, decode };
}

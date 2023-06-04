import { Storage } from './interfaces';

export class LruStorage implements Storage {
  private readonly storage: Storage;

  private readonly maxBytes: number;

  private bytesUsed = 0;

  private readonly sizeMap = new Map<string, number>();

  private readonly lruKeys = new Array<string>();

  constructor(storage: Storage, maxBytes: number) {
    this.storage = storage;
    this.maxBytes = maxBytes;
  }

  getItem(key: string): string | null {
    const value = this.storage.getItem(key);
    if (value) {
      this.lruKeys.splice(this.lruKeys.indexOf(key), 1);
      this.lruKeys.push(key);
    }
    return value;
  }

  setItem(key: string, value: string): void {
    const newItemSize = key.length + value.length;

    if (newItemSize > this.maxBytes) {
      console.log(`[LruStorage] Trying to insert an item that is too large (${newItemSize}), skipping`);
      return;
    }

    this.removeItem(key);

    while (this.bytesUsed + newItemSize > this.maxBytes) {
      const lruKey = this.lruKeys.shift()!;
      this.bytesUsed -= this.sizeMap.get(lruKey)!;
      this.sizeMap.delete(lruKey);
      this.storage.removeItem(lruKey);
      console.log(`[LruStorage] Freed '${lruKey}', new size: ${this.bytesUsed}`);
    }

    this.lruKeys.push(key);
    this.bytesUsed += newItemSize;
    this.sizeMap.set(key, newItemSize);
    this.storage.setItem(key, value);
    console.log(`[LruStorage] Inserted '${key}', new size: ${this.bytesUsed}`);
  }

  removeItem(key: string): void {
    const itemSize = this.sizeMap.get(key);
    if (itemSize) {
      this.lruKeys.splice(this.lruKeys.indexOf(key), 1);
      this.bytesUsed -= itemSize;
    }
  }
}

export interface Message {
  topicId: string;
  content: any;
}

export type MessageListener = (message: Message) => void;

export interface Subscription {
  unsubscribe: () => void;
}

export interface Client {
  connect: () => void;
  disconnect: () => void;
  subscribe: (topicId: string, listener: MessageListener, cacheLimit?: number) => Subscription;
}

export interface Storage {
  getItem(key: string): string | null;

  setItem(key: string, value: string): void;

  removeItem(key: string): void;
}

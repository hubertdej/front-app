import { io, Socket } from 'socket.io-client';
import { Client, Message, MessageListener, Storage } from './interfaces';

class CounterMap {
  private readonly counters = new Map<string, number>();

  get(key: string) {
    return this.counters.get(key) ?? 0;
  }

  private set(key: string, value: number) {
    this.counters.set(key, value);
    return value;
  }

  increment(key: string) {
    return this.set(key, this.get(key) + 1);
  }

  decrement(key: string) {
    return this.set(key, this.get(key) - 1);
  }

  forEach(callback: (value: number, key: string) => void) {
    this.counters.forEach(callback);
  }
}

class MaxMap {
  private readonly defaultValue: number;

  private readonly cacheLimits = new Map<string, number>();

  constructor(defaultValue: number) {
    this.defaultValue = defaultValue;
  }

  get(key: string) {
    return this.cacheLimits.get(key) ?? this.defaultValue;
  }

  updateMax(key: string, value: number) {
    if (value > this.get(key)) {
      this.cacheLimits.set(key, value);
    }
  }
}

export class SocketClient implements Client {
  private readonly socket: Socket;

  private readonly messageStorage: Storage;

  private readonly subscriptionCounters = new CounterMap();

  private readonly cacheLimits = new MaxMap(1);

  constructor(endpoint: string, messageStorage: Storage) {
    this.messageStorage = messageStorage;

    this.socket = io(endpoint, { autoConnect: false });

    this.socket.on('connect', () => {
      this.subscriptionCounters.forEach((count, topicId) => {
        if (count > 0) {
          console.log(`[SocketClient] (Reconnect) Subscribing to topic ${topicId}`);
          this.socket.emit('subscribe', topicId);
        }
      });
    });
    this.socket.on('disconnect', () => {
      console.log('[SocketClient] Disconnected');
    });
    this.socket.on('message', (data: Message) => {
      console.log(`[SocketClient] Received message for topic '${data.topicId}'`);
      if (!this.subscriptionCounters.get(data.topicId)) {
        this.socket.emit('unsubscribe', data.topicId);
        return;
      }
      const messages = this.getCachedMessages(data.topicId);
      messages.push(data);
      this.setCachedMessages(data.topicId, messages);
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  private getCachedMessages(topicId: string): Message[] {
    const messages = JSON.parse(this.messageStorage.getItem(topicId) ?? '[]');
    this.cacheLimits.updateMax(topicId, messages.length);
    return messages;
  }

  private setCachedMessages(topicId: string, messages: Message[]) {
    const limit = this.cacheLimits.get(topicId);
    this.messageStorage.setItem(topicId, JSON.stringify(messages.slice(-limit)));
  }

  subscribe(topicId: string, listener: MessageListener, cacheLimit?: number) {
    const count = this.subscriptionCounters.increment(topicId);
    this.cacheLimits.updateMax(topicId, cacheLimit ?? 0);

    this.getCachedMessages(topicId).forEach(listener);

    const filteredListener = (message: Message) => {
      if (message.topicId === topicId) {
        listener(message);
      }
    };
    this.socket.on('message', filteredListener);

    if (count === 1) {
      console.log(`[SocketClient] Subscribing to topic '${topicId}'`);
      this.socket.emit('subscribe', topicId);
    }

    return { unsubscribe: () => this.unsubscribe(topicId, filteredListener) };
  }

  private unsubscribe(topicId: string, listener: MessageListener) {
    const count = this.subscriptionCounters.decrement(topicId);
    if (count < 0) {
      throw new Error(`Cannot unsubscribe from topic '${topicId}': no subscriptions`);
    }
    this.socket.off('message', listener);
    if (count === 0) {
      console.log(`[SocketClient] Unsubscribing from topic '${topicId}'`);
      this.socket.emit('unsubscribe', topicId);
    }
  }
}

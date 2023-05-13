import { useEffect, useReducer } from 'react';
import { useClientContext } from './client-context';

function reduceArray<K, V>(items: ReadonlyArray<[K, V]>, newItem: [K, V]) {
  const index = items.findIndex(item => item[0] === newItem[0]);
  if (index === -1) {
    return [...items, newItem];
  }
  return [...items.slice(0, index), newItem, ...items.slice(index + 1)];
}

export function useSubscription(topics: string[]) {
  const client = useClientContext();
  const [items, updateItem] = useReducer(reduceArray<string, any>, []);

  useEffect(() => {
    const subscriptions = topics.map(topic => {
      return client.subscribe(topic, m => updateItem([m.topicId, m.content]));
    });
    return () => subscriptions.forEach(s => s.unsubscribe());
  }, [client, topics]);

  return items;
}


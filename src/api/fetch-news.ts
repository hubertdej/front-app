import { getNews } from './requests';
import { News } from '../models/news';

export async function fetchNews(term: string, when: number, limit: number): Promise<News[]> {
  if (term == '') {
    return [];
  }
  try {
    return await getNews({ term, when, limit });
  } catch (e) {
    console.error('Error searching news', e);
    return [];
  }
}

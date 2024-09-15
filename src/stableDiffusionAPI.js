import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

export async function fetchImages(query, count = 3) {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: query,
        per_page: count,
        client_id: UNSPLASH_API_KEY
      }
    });
    return response.data.results.map(image => image.urls.regular);
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

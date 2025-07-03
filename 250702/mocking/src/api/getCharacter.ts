import axios from 'axios';

export async function getCharacter(id: number): Promise<any> {
  try {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`,
    );

    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch character');
  }
}

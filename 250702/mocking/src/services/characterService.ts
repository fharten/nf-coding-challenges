import { getCharacter } from '../api/getCharacter';

export async function getCharacterName(id: number): Promise<string> {
  const character = await getCharacter(id);
  return character.name;
}

export async function isCharacterAlive(id: number): Promise<boolean> {
  const character = await getCharacter(id);
  return character.status === 'Alive';
}

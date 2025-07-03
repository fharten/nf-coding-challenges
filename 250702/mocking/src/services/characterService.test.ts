import axios from 'axios';
import { getCharacterName, isCharacterAlive } from './characterService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('get character infos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getCharacterName returns character name', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { id: 1, name: 'Rick Sanchez', status: 'Alive' },
    });

    const name = await getCharacterName(1);
    expect(name).toBe('Rick Sanchez');
  });

  test('getCharacterName throws error when API fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

    await expect(getCharacterName(1)).rejects.toThrow(
      'Failed to fetch character',
    );
  });

  test('isCharacterAlive returns true if status is Alive', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { id: 1, name: 'Rick Sanchez', status: 'Alive' },
    });

    const alive = await isCharacterAlive(1);
    expect(alive).toBe(true);
  });

  test('isCharacterAlive returns false if status is Dead', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { id: 2, name: 'Morty Smith', status: 'Dead' },
    });

    const alive = await isCharacterAlive(2);
    expect(alive).toBe(false);
  });

  test('isCharacterAlive throws error on failed API call', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

    await expect(isCharacterAlive(1)).rejects.toThrow(
      'Failed to fetch character',
    );
  });
});

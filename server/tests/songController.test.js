// songController.test.js
const request = require('supertest');
const express = require('express');
const songRouter = require('./songController');

// Mock the songs data
const mockSongsData = [
  { id: 1, title: "Song 1" },
  { id: 2, title: "Song 2" }
];

// Mock the songController module
jest.mock('./songController', () => {
  return {
    loadInitialSong: jest.fn((req, res) => res.json(mockSongsData)),
    getSongById: jest.fn((req, res) => {
      const song = mockSongsData.find(s => s.id === parseInt(req.params.id));
      if (song) {
        res.json(song);
      } else {
        res.status(404).json({ message: "Song not found" });
      }
    })
  };
});

const app = express();
app.use('/server-api', songRouter);

describe('Song Controller', () => {
  test('GET /server-api/songs should return all songs', async () => {
    const response = await request(app).get('/server-api/songs');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSongsData);
  });

  test('GET /server-api/songs/:id should return a specific song', async () => {
    const response = await request(app).get('/server-api/songs/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSongsData[0]);
  });

  test('GET /server-api/songs/:id with non-existing id should return 404', async () => {
    const response = await request(app).get('/server-api/songs/999');
    expect(response.statusCode).toBe(404);
  });
});

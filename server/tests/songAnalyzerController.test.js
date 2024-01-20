describe("analyzeSong", () => {
    test("should successfully fetch the audio file and process it using Essentia", async () => {
      // Mock fetch response
      const audioResponse = {
        ok: true,
        arrayBuffer: jest.fn().mockResolvedValue("audio data"),
      };
      global.fetch = jest.fn().mockResolvedValue(audioResponse);
  
      // Mock Essentia response
      const essentia = {
        SpectralCentroid: jest.fn().mockReturnValue("analysis result"),
      };
      const essentiaModule = jest.fn().mockResolvedValue(essentia);
      global.import = jest.fn().mockImplementation((module) => {
        if (module === "essentia.js") {
          return essentiaModule;
        }
        throw new Error(`Failed to import module: ${module}`);
      });
  
      const result = await analyzeSong({ params: { songIndex: 1 } });
  
      expect(result).toEqual({ analysisResult: "analysis result" });
      expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/music/song1/track3.mp3`);
      expect(essentia.SpectralCentroid).toHaveBeenCalledWith("audio data");
    });
  });
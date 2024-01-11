"use strict";
const express = require('express');
const router = express.Router();
const songsData = [
    {
        id: 1,
        title: "Angels, Gurus & Advertising",
        samples: [
            {
                parts: [
                    {
                        text: "Loser's Lament by ",
                    },
                    {
                        text: "Davie Allen & the Arrows",
                        link: "https://www.youtube.com/watch?v=oqAqhgsv410&ab_channel=DavieAllan%26TheArrows-Topic",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "String Gourd Instrument from Allan Lomax's Songs of Thailand",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Alan Watts' 'Limitations of Language' ",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Various Clips from TV Advertisements",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "All instruments and production by ",
                    },
                    {
                        text: "Kr1st0",
                        link: "http://kristo-portfolio.vercel.app/",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "Struggle & Triumph",
        samples: [
            {
                parts: [
                    {
                        text: "Save the People ",
                    },
                    {
                        text: "Eddie Kendricks",
                        link: "https://www.youtube.com/watch?v=oqAqhgsv410&ab_channel=DavieAllan%26TheArrows-Topic",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Interview with ",
                    },
                    {
                        text: "George Jackson",
                        link: "https://www.youtube.com/watch?v=qspVurxa_yw&ab_channel=AfroMarxist",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Interview with ",
                    },
                    {
                        text: "Huey Newton",
                        link: "https://www.youtube.com/watch?v=9a9v2JsycbU&ab_channel=AfroMarxist",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Fred Hampton dialogue from ",
                    },
                    {
                        text: "Documentary",
                        link: "https://www.youtube.com/watch?v=w-RxvgIMfX4&ab_channel=TheBlackestPanther",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Audre Lord reading her poem ",
                    },
                    {
                        text: "A Litany for Survival",
                        link: "https://www.poetryfoundation.org/poems/147275/a-litany-for-survival",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "All instruments and production by ",
                    },
                    {
                        text: "Kr1st0",
                        link: "http://kristo-portfolio.vercel.app/",
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        title: "Power of Mars",
        samples: [
            {
                parts: [
                    {
                        text: "Dialogue from ",
                    },
                    {
                        text: "Devil Girl from Mars",
                        link: "https://www.youtube.com/watch?v=yr0s1y5BwHk&ab_channel=communiTV",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "All instruments and production by ",
                    },
                    {
                        text: "Kr1st0",
                        link: "http://kristo-portfolio.vercel.app/",
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        title: "Weezy WorldWyde ft. Lil Wayne",
        samples: [
            {
                parts: [
                    {
                        text: "Worldwide by ",
                    },
                    {
                        text: "Allen Toussaint",
                        link: "https://www.youtube.com/watch?v=VbOD2PdaBGE&ab_channel=getamoodon",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Dialogue from ",
                    },
                    {
                        text: "Nardwaur vs Lil Wayne",
                        link: "https://www.youtube.com/watch?v=wgMUhI_SN68&ab_channel=NardwuarServiette",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Dialogue from the intro of ",
                    },
                    {
                        text: "Damn Right I Am Somebody by Fred Wesley",
                        link: "https://www.youtube.com/watch?v=9V9VVJBSPp8&ab_channel=TheJ.B.%27s-Topic            ",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "All instruments and production by ",
                    },
                    {
                        text: "Kr1st0",
                        link: "http://kristo-portfolio.vercel.app/",
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        title: "Alphaville, Tennessee",
        samples: [
            {
                parts: [
                    {
                        text: "Memphis, Tennessee by ",
                    },
                    {
                        text: "Wilson Pickett",
                        link: "https://www.youtube.com/watch?v=ud1IJ7Ok2ZQ&ab_channel=WilsonPickett-Topic",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "A Generative AI reading of the opening scene from ",
                    },
                    {
                        text: "Alphaville by Jean-Luc Godard",
                        link: "https://www.youtube.com/watch?v=UitB6c8QP80&ab_channel=KatrinMiaHerrnsdorf",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "Dialogue from ",
                    },
                    {
                        text: "A Fire in the Sky",
                        link: "https://www.youtube.com/watch?v=I8C_JaT8Lvg&list=PLNrdVOgc5C74uz9JbsQnpgODDFdhjCXRH&index=386&ab_channel=TRANSTARLEXINGTON",
                    },
                ],
            },
            {
                parts: [
                    {
                        text: "All instruments and production by ",
                    },
                    {
                        text: "Kr1st0",
                        link: "http://kristo-portfolio.vercel.app/",
                    },
                ],
            },
        ],
    },
];
const loadInitialSong = (req, res) => {
    try {
        if (!songsData) {
            throw new Error("No song data is available");
        }
        console.log(songsData);
        res.json(songsData);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

const getSongById = (req, res) => {
  try {
    const songId = parseInt(req.params.id);
    const song = songsData.find((s) => s.id === songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(song);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

router.get("/songs", loadInitialSong);
router.get("/songs/:id", getSongById);
module.exports = router;

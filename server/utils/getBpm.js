
function getPeaks(data){
  // First we will identify the loudest sample in each part. This is the "beat".
  // Each "part" is 0.5 seconds long - or 22,050 samples.
  // This will give us 60 'beats' - we will take the loudest half of those
  // This will allow us to ignore breaks, and allow us to address tracks with a BPM below 120.

  var partSize = 22050,
    parts = data[0].length / partSize,
    peaks = [];

  for (var i = 0; i < parts; i++) {
    var max = null;
    for (var j = i * partSize; j < (i + 1) * partSize; j++) {
      var volume = Math.max(Math.abs(data[0][j]), Math.abs(data[1][j]));
      if (!max || volume > max.volume) {
        max =
          {
            position: j,
            volume: volume,
          } || null;
      }
    }
    peaks.push(max);
  }

  // sort the peaks according to volume

  peaks.sort(function (a, b) {
    if (!a || !b) {
      return 0;
    }

    return b.volume - a.volume;
  });

  // take the loudest half of those...

  peaks = peaks.splice(0, peaks.length * 0.5);

  // re-sort it back based on position.

  peaks.sort(function (a, b) {
    if (!a || !b) {
      return 0;
    } else return a.position - b.position;
  });

  return peaks.filter((peak)=> peak !== null);
}

function getIntervals(peaks){
  // What we now do is get all of our peaks, and then measure the distance to
  // other peaks, to create intervals.  Then based on the distance between
  // those peaks (the distance of the intervals) we can calculate the BPM of
  // that particular interval.

  // The interval that is seen the most should have the BPM that corresponds
  // to the track itself.

  var groups=[];

  peaks.forEach(function (peak, index) {
    for (var i = 1; index + i < peaks.length && i < 10; i++) {
      var group = {
        tempo: (60 * 44100) / (peaks[index + i].position - peak.position),
        count: 1,
      };

      while (group.tempo < 90) {
        group.tempo *= 2;
      }

      while (group.tempo > 180) {
        group.tempo /= 2;
      }

      group.tempo = Math.round(group.tempo);

      if (
        !groups.some(function (interval) {
          return interval.tempo === group.tempo ? interval.count++ : 0;
        })
      ) {
        groups.push(group);
      }
    }
  });
  return groups;
}

function splitStereoBuffer(interleavedBuffer) {
  const leftChannel = [];
  const rightChannel = [];
  for (let i = 0; i < interleavedBuffer.length; i += 2) {
    leftChannel.push(interleavedBuffer[i]);
    rightChannel.push(interleavedBuffer[i + 1]);
  }
  return [leftChannel, rightChannel];
}

const getBpm = (interleavedBuffer) => {
  if (!interleavedBuffer) {
    return null;
  }

  // Split the interleaved stereo buffer into two channels
  const [leftChannel, rightChannel] = splitStereoBuffer(interleavedBuffer);

  
  const peaks = getPeaks([leftChannel, rightChannel]);
  console.log("peaks is", peaks);
  const groups = getIntervals(peaks);
  console.log("groups is", groups);

  if (groups.length === 0) {
    return null;
  }

  // Sort groups by count
  groups.sort((a, b) => b.count - a.count);

  // Return the tempo of the group with the highest count
  return groups[0].tempo;
};


module.exports = {
    getBpm
  };
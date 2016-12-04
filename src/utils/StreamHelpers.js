/**
 * Utils for all stream operating functions
 */
import * as most from 'most';

/**
 * Takes 2 streams and returns a single stream with them as an array
 */
export const joinStreams = (stream1, stream2) => most.combine(
    (s1, s2) => [s1, s2],
    stream1,
    stream2,
  );

export const joinAllStreams = streams =>
  most.combineArray(
    (...allStreams) => allStreams,
    streams,
  );

// Array of Strava activities
// include the following fields:
// - name/title of activity
// - duration
// - distance (N/A for workouts)
// - type (run, ride, workout, etc)
// - date
// - url (link to activity on Strava)
// length of array should be 10
const recentActivities = [
  {
    name: "Morning Run",
    duration: "1:30:00",
    distance: "10.0 mi",
    type: "Run",
    date: "2021-09-01",
    url: "https://www.strava.com/activities/123456789",
  },
  {
    name: "Evening Ride",
    duration: "1:00:00",
    distance: "20.0 mi",
    type: "Ride",
    date: "2021-09-02",
    url: "https://www.strava.com/activities/123456789",
  },
  {
    name: "Lunch Run",
    duration: "0:45:00",
    distance: "5.0 mi",
    type: "Run",
    date: "2021-09-03",
    url: "https://www.strava.com/activities/123456789",
  },
  {
    name: "Morning Workout",
    duration: "1:30:00",
    distance: "N/A",
    type: "Strength Workout",
    date: "2021-09-14",
    url: "https://www.strava.com/activities/123456789",
  },
  {
    name: "Evening Ride",
    duration: "1:00:00",
    distance: "20.0 mi",
    type: "Ride",
    date: "2021-09-02",
    url: "https://www.strava.com/activities/123456789",
  },
  {
    name: "Lunch Run",
    duration: "0:45:00",
    distance: "5.0 mi",
    type: "Run",
    date: "2021-09-03",
    url: "https://www.strava.com/activities/123456789",
  },
  {
    name: "Morning Run",
    duration: "1:30:00",
    distance: "10.0 mi",
    type: "Run",
    date: "2021-09-01",
    url: "https://www.strava.com/activities/123456789",
  },
  {
    name: "Evening Workout",
    duration: "1:00:00",
    distance: "N/A",
    type: "Strength Workout",
    date: "2021-09-02",
    url: "https://www.strava.com/activities/123456789",
  },
];

const recentJams = [
  {
    title: "Izzo (H.O.V.A.)",
    artist: "Jay-Z",
    album: "The Blueprint",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/3nFV4U8q8Fv0ewI5Z7Z0R5",
  },
  {
    title: "Ms. Jackson",
    artist: "OutKast",
    album: "Stankonia",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273e6e7e7c5b2f0e7d6e2f6e7e7",
    url: "https://open.spotify.com/track/0I3q5fE6wg7LIfHGngUTnV",
  },
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    album: "No More Drama",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/7qG3b048QCHVRO5Pv1T5lw",
  },
  {
    title: "Izzo (H.O.V.A.)",
    artist: "Jay-Z",
    album: "The Blueprint",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/3nFV4U8q8Fv0ewI5Z7Z0R5",
  },
  {
    title: "Ms. Jackson",
    artist: "OutKast",
    album: "Stankonia",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273e6e7e7c5b2f0e7d6e2f6e7e7",
    url: "https://open.spotify.com/track/0I3q5fE6wg7LIfHGngUTnV",
  },
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    album: "No More Drama",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/7qG3b048QCHVRO5Pv1T5lw",
  },
  {
    title: "Izzo (H.O.V.A.)",
    artist: "Jay-Z",
    album: "The Blueprint",
    albumCover: "https://i.scdn.co/image/ab67616",
    url: "https://open.spotify.com/track/3nFV4U8q8Fv0ewI5Z7Z0R5",
  },
  {
    title: "Izzo (H.O.V.A.)",
    artist: "Jay-Z",
    album: "The Blueprint",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/3nFV4U8q8Fv0ewI5Z7Z0R5",
  },
  {
    title: "Ms. Jackson",
    artist: "OutKast",
    album: "Stankonia",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273e6e7e7c5b2f0e7d6e2f6e7e7",
    url: "https://open.spotify.com/track/0I3q5fE6wg7LIfHGngUTnV",
  },
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    album: "No More Drama",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/7qG3b048QCHVRO5Pv1T5lw",
  },
  {
    title: "Izzo (H.O.V.A.)",
    artist: "Jay-Z",
    album: "The Blueprint",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/3nFV4U8q8Fv0ewI5Z7Z0R5",
  },
  {
    title: "Ms. Jackson",
    artist: "OutKast",
    album: "Stankonia",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273e6e7e7c5b2f0e7d6e2f6e7e7",
    url: "https://open.spotify.com/track/0I3q5fE6wg7LIfHGngUTnV",
  },
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    album: "No More Drama",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c4f2e2f3d1d2b8d0e3a3d9e5",
    url: "https://open.spotify.com/track/7qG3b048QCHVRO5Pv1T5lw",
  },
  {
    title: "Izzo (H.O.V.A.)",
    artist: "Jay-Z",
    album: "The Blueprint",
    albumCover: "https://i.scdn.co/image/ab67616",
    url: "https://open.spotify.com/track/3nFV4U8q8Fv0ewI5Z7Z0R5",
  },
];

export { recentJams, recentActivities };

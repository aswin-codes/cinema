# Movie and Show Tracker App

A React Native app that allows users to explore, search, filter, and track movies and shows. Key features:

1. **Search:** Search movies or shows by title.
2. **Filter:** Display movies, shows, or both.
3. **Fetch Data:** Fetch movie and show data from a remote API.
4. **UI with Images:** Show movie/show posters, titles, and types.
5. **Loading State:** Display a loading indicator during data fetching.
6. **Responsive Design:** Optimized for Android and iOS.

## API Endpoints Used

**Get Movies List:**
- Endpoint: `GET https://api.rapidmock.com/api/vikuman/v1/movies/all`
- Description: Retrieves a list of all available movies.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Setup
1. Clone the repository: `git clone https://github.com/aswin-codes/cinema.git`
2. Install dependencies: `cd cinema && npm install`
3. Run the app: `npm run android`

Scan the QR code to open the app on your device, or use an emulator to run it on your machine.

## Features in Development
- User Authentication: Sign in to save "To Watch" or "Watched" lists.
- My List Screen: Display saved movies/shows in different categories.
- Movie/Show Details Screen: Show more detailed information.

## Folder Structure
``` # Images used for the app
├── components
│   └── HomeScreen.js    # Home screen component
├── App.js               # Main app entry
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Dependencies
- `react-native`: Core framework
- `native-base`: UI components
- `react-navigation`: Navigation library
- `expo`: App development platform
- `react-icons`: Icon library
- `@expo/vector-icons`: Additional icons

## License
This project is licensed under the MIT License.
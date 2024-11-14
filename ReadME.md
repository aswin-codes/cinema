# Movie and Show Tracker App

A React Native app that allows users to explore, search, filter, and track movies and shows. This app fetches movie data from an API and displays it with movie/show posters, titles, and types. Users can also filter the list by type (movies/shows) and search by title.

## Key Features:
1. **Search**: Search movies or shows by their title.
2. **Filter**: Filter the list to display either movies, shows, or both.
3. **Fetch Data**: Fetch movie and show data from a remote API.
4. **UI with Images**: Display movie/show posters along with the title and type.
5. **Loading State**: Show a loading indicator while the app is fetching data.
6. **Responsive Design**: The app is responsive and optimized for both Android and iOS.

## API Endpoints Used
- **Get Movies List**:
  - Endpoint: `GET https://api.rapidmock.com/api/vikuman/v1/movies/all`
  - Description: Retrieves a list of all available movies.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Step-by-Step Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/aswin-codes/cinema.git
   cd cinema
Install Dependencies

bash
Copy code
npm install
Run the App

For development on Expo:
bash
Copy code
npx expo start
Scan the QR code to open the app on your phone, or use an emulator to run the app on your local machine.
Open the App: You should now see the home screen with movies and shows displayed.

Features in Development
User Authentication: Users can sign in to save their "To Watch" or "Watched" list.
My List Screen: Displays a list of movies/shows that the user has saved in different categories.
Movie/Show Details Screen: Displays more detailed information about the selected movie or show.
Folder Structure
bash
Copy code
├── assets
│   └── images/          # Images used for the app
├── components
│   └── HomeScreen.js    # Home screen component
├── App.js               # Main app entry
├── package.json         # Project dependencies and configurations
└── README.md            # Project documentation
Dependencies
react-native: The core framework for building the app.
native-base: UI component library for React Native.
react-navigation: Navigation library for React Native.
expo: Platform for building and deploying React Native apps.
react-icons: Icon library for icons used in the app.
@expo/vector-icons: For using Ionicons and other icons.
License
This project is licensed under the MIT License.


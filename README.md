🌦 Weather Dashboard Web App

An interactive weather dashboard that allows users to search for cities and view real-time weather conditions, hourly forecasts, and interactive weather map layers.
The application integrates live weather data, dynamic charts, and an interactive map to create a modern and responsive user experience.

🔗 Live Demo:
https://cdl9.github.io/weatherApp/

📌 Features

🌍 City Search – Search for any city and instantly retrieve current weather data
🗺 Interactive Map – Display city location using an interactive map powered by React Leaflet
☁ Weather Layers – Toggle map overlays for:
	Clouds
	Temperature
	Wind
📊 Dynamic Charts – View hourly forecasts including:
	Temperature
	Wind Speed
	Humidity
	Rain

💾 Saved Cities – Persist saved cities using LocalStorage
📍 Map Marker Popup – Automatically opens when a new city is selected
✨ Animated UI Feedback – Smooth scroll-to-top and glow animation when switching cities
🌗 Dark Mode Support
📱 Responsive Design – Optimized for desktop and mobile devices

🛠 Technologies Used

Frontend
- React (Functional Components & Hooks)
- JavaScript (ES6+)
- HTML5
- CSS3

Libraries

- React Leaflet
- Leaflet.js
- Recharts (Data Visualization)
- APIs
- OpenWeather API (Current Weather + Forecast + Map Tiles)
Other
- LocalStorage API
- Responsive CSS Media Queries

🧠 Technical Highlights

- Managed asynchronous API calls with loading and error handling
- Built dynamic chart switching between temperature, wind, humidity, and rain
- Customized Recharts tooltips and gradient area charts
- Implemented interactive map layers using Leaflet LayersControl
- Used React refs to control map markers and auto-open popups
- Applied CSS filters and styling adjustments to map tile layers
- Optimized state updates to prevent unnecessary re-renders
- Designed mobile-first responsive layouts

🚀 Installation

If you'd like to run this project locally:

# Clone the repository
git clone https://github.com/cdl9/weatherApp.git

# Navigate into the project folder
cd weatherApp

# Install dependencies
npm install

# Start the development server
npm run dev


🎯 Future Improvements

- Add 5–7 day forecast visualization
- Allow removing saved cities
- Add geolocation support to detect user's current city
- Improve performance and caching of API responses

📚 What I Learned

- Through building this project, I strengthened my skills in:
- React component architecture
- API integration and async data handling
- Data visualization with charts
- Interactive maps with Leaflet
- Managing complex UI state
- Creating responsive and polished user interfaces
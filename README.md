# Abidjan Chamber of Commerce Website

A modern, responsive website for promoting the Abidjan Chamber of Commerce, its members, and regional economic opportunities.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Pages](#pages)

## Features

- **Responsive Design** - Mobile-first layout optimized for all devices.
- **Modern Colors** - Professional gold, blue, and red palette.
- **Interactive Directory** - Real-time search and filtering.
- **Weather Display** - Abidjan weather module with demo fallback.
- **Membership Form** - Complete application workflow.
- **Local Storage** - Applications are saved locally in the browser.
- **Performance** - Lazy loading and smooth animations.

## Project Structure

```text
wdd231-/
|-- index.html                 # Home page
|-- discover.html              # Discover Abidjan
|-- directory.html             # Business directory
|-- join.html                  # Join the Chamber
|-- styles/
|   |-- normalize.css          # CSS normalization
|   |-- small.css              # Mobile styles
|   |-- medium.css             # Tablet styles (768px+)
|   `-- large.css              # Desktop styles (1200px+)
|-- scripts/
|   |-- main.js                # Main functions
|   |-- weather.js             # Weather module
|   |-- directory.js           # Directory module
|   `-- join.js                # Membership module
|-- data/
|   `-- members.json           # Business data
`-- images/                    # Image folder
```

## Installation & Configuration

1. Open the project with a local server, such as VS Code Live Server or `python -m http.server`.
2. Add images to `/images/` as needed.
3. For live weather, configure your OpenWeatherMap API key in `scripts/weather.js`.
4. Edit `data/members.json` to add or update member businesses.

## Pages

- **Home**: Hero section, weather, and featured businesses.
- **Discover**: History, demographics, economy, and gallery.
- **Directory**: Business search and filtering.
- **Join**: Membership plans and application form.

## Main Functionality

- Responsive hamburger menu
- Weather display with demo fallback
- Directory with search and filtering
- Membership form with validation
- Application storage with localStorage
- Smooth animations
- Mobile-first responsive design

---

**For the Abidjan Chamber of Commerce**

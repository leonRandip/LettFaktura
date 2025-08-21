# LettFaktura Clone - Terms Page

A React-based clone of the 123 Fakturera terms page with multilingual support (Swedish and English) and a working hamburger menu.

## Features

- **Multilingual Support**: Swedish (Svenska) and English content
- **Responsive Design**: Mobile-first approach with hamburger menu
- **PostgreSQL Database Design**: Schema and mock data service included
- **Modern UI**: Styled with styled-components and modern design principles
- **Working Navigation**: Hamburger menu that functions on mobile devices
- **Background Images**: Uses the provided storage URLs for images and flags

## Database Schema

The project includes a PostgreSQL schema design for storing multilingual content:

- `languages` table: Stores language information and flag URLs
- `content_sections` table: Defines content sections (navigation, terms, etc.)
- `multilingual_content` table: Stores actual text content in different languages

## Storage URLs Used

- **Flags**:
  - Swedish: `https://storage.123fakturere.no/public/flags/SE.png`
  - English: `https://storage.123fakturere.no/public/flags/GB.png`
- **Background**: `https://storage.123fakturera.se/public/wallpapers/sverige43.jpg`
- **Logo**: `https://storage.123fakturera.se/public/icons/diamond.png`

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Navigation with hamburger menu
│   ├── TermsPage.jsx       # Main terms page
│   └── HomePage.jsx        # Home page (dummy)
├── contexts/
│   └── LanguageContext.jsx # Language management
├── services/
│   └── databaseService.js  # Mock database service
└── database/
    └── schema.sql          # PostgreSQL schema
```

## Usage

- **Navigation**: Use the hamburger menu on mobile devices
- **Language Switching**: Click on the language selector (flag + language name) to switch between Swedish and English
- **Terms Page**: Navigate to `/terms` to see the terms and conditions
- **Responsive**: The site works on all device sizes

## Database Integration

To connect to a real PostgreSQL database:

1. Update the connection details in `src/services/databaseService.js`
2. Uncomment the real database code
3. Run the schema from `src/database/schema.sql`

## Development

- Built with React 19
- Uses Vite for fast development
- Styled with styled-components
- Includes ESLint configuration
- No backend required (frontend-only with mock data)

## Routes

- `/` - Home page (dummy)
- `/terms` - Terms and conditions page
- `/order` - Order page (dummy)
- `/customers` - Customers page (dummy)
- `/about` - About page (dummy)
- `/contact` - Contact page (dummy)

The terms page is the main focus and contains the actual content you requested.

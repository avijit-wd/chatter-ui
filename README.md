# Chatter

A modern real-time chat application built with React, TypeScript, and Material-UI.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI) v7** - Component library
- **React Router Dom v7** - Client-side routing
- **Emotion** - CSS-in-JS styling
- **ESLint** - Code linting

## 📦 Features

- Dark theme UI with Material-UI
- Authentication system (Login page)
- Client-side routing with React Router
- TypeScript for type safety
- Fast development with Vite HMR
- Responsive design

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd chatter
```

2. Install dependencies:

```bash
npm install
```

### Installing Specific Features

The following commands were used to add specific features to this project:

#### Routing and Data Management

```bash
npm i react-router-dom localforage match-sorter sort-by
```

- **react-router-dom**: Client-side routing
- **localforage**: Offline storage (IndexedDB/WebSQL/localStorage)
- **match-sorter**: Sorting and filtering utilities
- **sort-by**: Simple sorting utility

#### Material-UI and Styling

```bash
npm i @mui/material @emotion/react @emotion/styled @mui/icons-material @fontsource/roboto
```

- **@mui/material**: Material-UI component library
- **@emotion/react & @emotion/styled**: CSS-in-JS styling
- **@mui/icons-material**: Material Design icons
- **@fontsource/roboto**: Roboto font (Material-UI default)

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

This starts the development server at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This compiles TypeScript and builds the app for production.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally.

### Linting

```bash
npm run lint
```

Check code quality with ESLint.

## 📁 Project Structure

```
chatter/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── auth/       # Authentication components
│   │   │   └── Auth.tsx
│   │   └── Routes.tsx  # Route configuration
│   ├── assets/         # Images and icons
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🎨 Theme

The application uses Material-UI's dark theme by default. Theme configuration can be found in `src/App.tsx`.

## 📝 Available Routes

- `/login` - Authentication page

## 🔧 Configuration

### TypeScript

- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript settings
- `tsconfig.node.json` - Node/Vite-specific TypeScript settings

### Vite

Configuration can be found in `vite.config.ts`

### ESLint

Configuration can be found in `eslint.config.js`

## 🔐 Security Note

There are 2 vulnerabilities detected in dependencies (1 moderate, 1 high). To address them:

```bash
npm audit fix
# Or for breaking changes:
npm audit fix --force
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.

---

## 🔍 Development Notes

### React + Vite Template

This project is based on the React + TypeScript + Vite template, which provides:

- Fast Hot Module Replacement (HMR)
- ESLint rules for code quality
- TypeScript for type safety

### ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

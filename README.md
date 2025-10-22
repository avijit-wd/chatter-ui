# Chatter UI

A modern real-time chat application frontend built with React, TypeScript, and Material-UI, integrated with a NestJS GraphQL backend.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with backend URL
echo "VITE_API_URL=http://localhost:3000" > .env

# 3. Ensure backend server is running on port 3000

# 4. Generate GraphQL types from backend schema
npm run codegen

# 5. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## � Recent Configuration Changes

### TypeScript Configuration Updates

**Changed in `tsconfig.app.json`:**

- Set `verbatimModuleSyntax: false` to allow regular imports without requiring `import type` syntax
- This prevents TypeScript errors when importing types alongside values

**Why this change?**

- The generated GraphQL code and other libraries don't always use explicit type imports
- Setting this to `false` makes the development experience smoother
- TypeScript will still optimize imports correctly during compilation

### ESLint Configuration Updates

**Changed in `eslint.config.js`:**

- Disabled `@typescript-eslint/consistent-type-imports` rule
- Added custom rules section to ESLint configuration

```javascript
rules: {
  '@typescript-eslint/consistent-type-imports': 'off',
}
```

**Why this change?**

- Allows flexibility in how you write imports
- Prevents ESLint from enforcing `import type` syntax
- Reduces developer friction when working with generated code

### Package.json Script Updates

**New scripts added:**

- `codegen:watch` - Run GraphQL Code Generator in watch mode
- Updated `dev` script to run both Vite and codegen in watch mode concurrently

```json
{
  "scripts": {
    "dev": "concurrently \"vite\" \"npm run codegen:watch\"",
    "codegen": "graphql-codegen --config codegen.ts",
    "codegen:watch": "graphql-codegen --config codegen.ts --watch"
  }
}
```

**Why this change?**

- Automatic type regeneration when GraphQL queries change
- No need to manually run `npm run codegen` after every query update
- Seamless development experience with hot reloading

### New Dependencies

**Installed `concurrently` as dev dependency:**

```bash
npm i -D concurrently
```

**Why this package?**

- Runs multiple npm scripts simultaneously
- Enables running Vite dev server and GraphQL codegen watch mode together
- Provides clean console output with colored logs for each process
- Allows stopping all processes with a single `Ctrl+C`

**Full list of GraphQL-related dependencies:**

```json
{
  "dependencies": {
    "@apollo/client": "^4.0.7",
    "graphql": "^16.11.0"
  },
  "devDependencies": {
    "@graphql-codegen/cli": "6.0.0",
    "@graphql-codegen/client-preset": "5.1.0",
    "concurrently": "latest"
  }
}
```

## �🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Material-UI (MUI) v7** - Component library
- **React Router Dom v7** - Client-side routing
- **Apollo Client 4** - GraphQL client for data fetching
- **GraphQL** - API query language
- **Emotion** - CSS-in-JS styling
- **ESLint** - Code linting

## 📦 Features

- 🎨 Dark theme UI with Material-UI
- 🔐 Complete authentication system (Login & Signup)
- 🔒 Protected routes with authentication guard
- 🚦 Client-side routing with React Router v7
- 📡 GraphQL integration with Apollo Client
- 🍪 Cookie-based session management
- 🛡️ Automatic logout on 401 errors
- ⚡ Fast development with Vite HMR
- 📱 Responsive design
- 🎯 TypeScript for type safety
- 🧩 Modular component architecture

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API running (chatter-backend)

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_URL=http://localhost:3000
```

Adjust the URL according to your backend API endpoint.

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd chatter-ui
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see above)

4. Start the development server:

```bash
npm run dev
```

### Installing Specific Features

The following commands were used to add specific features to this project:

#### GraphQL and Apollo Client

```bash
npm i @apollo/client graphql
```

- **@apollo/client**: Complete state management library for JavaScript
- **graphql**: JavaScript reference implementation for GraphQL

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

#### GraphQL Code Generator

```bash
npm i -D @graphql-codegen/cli @graphql-codegen/client-preset
```

- **@graphql-codegen/cli**: Generate TypeScript types from GraphQL schema
- **@graphql-codegen/client-preset**: Optimized preset for client-side apps

## 📝 GraphQL Code Generation

This project uses **GraphQL Code Generator** to automatically generate TypeScript types from your GraphQL schema and operations.

### Setup

The code generator is configured in `codegen.ts`:

```typescript
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql", // Backend GraphQL endpoint
  documents: "src/**/*.{ts,tsx}", // Where to find GraphQL queries
  generates: {
    "src/gql/": {
      // Output directory
      preset: "client",
      plugins: [],
    },
  },
};
```

### Running Code Generation

**Before running codegen, ensure the backend server is running!**

```bash
# Generate TypeScript types from GraphQL schema
npm run codegen
```

This will:

1. Fetch the GraphQL schema from `http://localhost:3000/graphql`
2. Scan all `.ts` and `.tsx` files for GraphQL operations
3. Generate type-safe functions in `src/gql/` directory

### Generated Files

After running `npm run codegen`, you'll find:

```
src/gql/
├── graphql.ts       # All generated types and documents
├── gql.ts           # The `graphql()` function for defining operations
├── fragment-masking.ts  # Fragment masking utilities
└── index.ts         # Exports all generated code
```

### Watch Mode (Automatic Regeneration)

When you run `npm run dev`, GraphQL Code Generator runs in watch mode automatically:

```bash
npm run dev
```

This starts:

1. **Vite dev server** - Your React app with hot reload
2. **GraphQL Codegen in watch mode** - Automatically regenerates types when:
   - You modify GraphQL queries/mutations in your code
   - The backend GraphQL schema changes
   - Any `.ts` or `.tsx` file with GraphQL operations is saved

**Benefits of Watch Mode:**

- ✅ No manual `npm run codegen` needed during development
- ✅ Types stay in sync with your queries automatically
- ✅ Immediate TypeScript autocomplete after query changes
- ✅ Catch schema mismatches instantly

**Running Codegen Standalone:**

```bash
# One-time generation (without watch)
npm run codegen

# Watch mode only (without starting Vite)
npm run codegen:watch
```

### Using Generated Types

Import the `graphql` function to define type-safe GraphQL operations:

```typescript
import { graphql } from "../gql";

// Define a mutation with automatic type inference
const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

// Use with Apollo Client hooks
const useCreateUser = () => {
  return useMutation(createUserDocument);
};
```

**Example with Query:**

```typescript
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";

const getMeDocument = graphql(`
  query GetMe {
    me {
      _id
      email
    }
  }
`);

const useGetMe = () => {
  const { data, loading, error } = useQuery(getMeDocument);
  return { user: data?.me, loading, error };
};
```

### Benefits

- ✅ **Type Safety**: Full TypeScript support for queries, mutations, and responses
- ✅ **Autocomplete**: IDE autocomplete for GraphQL operations
- ✅ **Error Detection**: Catch schema mismatches at compile time
- ✅ **No Manual Types**: Types are generated automatically from schema
- ✅ **Always in Sync**: Run codegen to update types when schema changes

### When to Run Codegen

**With Watch Mode (Recommended):**
When you run `npm run dev`, codegen runs automatically in watch mode. You don't need to manually trigger it during development!

**Manual Codegen:**
Run `npm run codegen` only when:

- Setting up the project for the first time
- Backend server was not running during initial setup
- You want to verify types without starting the dev server

## 🏃 Running the Application

### Available Scripts

| Script                      | Command                                       | Description                                       |
| --------------------------- | --------------------------------------------- | ------------------------------------------------- |
| **`npm run dev`**           | `concurrently "vite" "npm run codegen:watch"` | 🚀 Start dev server + auto-generate GraphQL types |
| **`npm run build`**         | `tsc -b && vite build`                        | 📦 Build for production                           |
| **`npm run preview`**       | `vite preview`                                | 👀 Preview production build locally               |
| **`npm run lint`**          | `eslint .`                                    | 🔍 Check code quality with ESLint                 |
| **`npm run codegen`**       | `graphql-codegen --config codegen.ts`         | 🔄 Generate types (one-time)                      |
| **`npm run codegen:watch`** | `graphql-codegen --config codegen.ts --watch` | 👁️ Generate types in watch mode                   |

### Script Details

**Development (`npm run dev`):**

- Starts Vite dev server on `http://localhost:5173`
- Runs GraphQL Code Generator in watch mode
- Automatically regenerates types when queries change
- Hot Module Replacement (HMR) for instant updates
- **Requires backend to be running on port 3000**

**Build (`npm run build`):**

- Compiles TypeScript code
- Bundles with Vite for production
- Outputs to `dist/` directory
- Optimizes assets for deployment

**Codegen Watch (`npm run codegen:watch`):**

- Monitors changes to GraphQL operations in `src/**/*.{ts,tsx}`
- Watches backend schema for changes
- Automatically regenerates types in `src/gql/`
- Runs continuously until stopped (Ctrl+C)

### Development Workflow

**Step 1: Start Backend Server**

```bash
# In chatter-backend directory
cd ../chatter-backend
npm run start:dev
```

**Step 2: Start Frontend with Auto-Codegen**

```bash
# In chatter-ui directory
npm run dev
```

This starts:

- ✅ Vite dev server at `http://localhost:5173`
- ✅ GraphQL Code Generator in watch mode
- ✅ Hot Module Replacement for instant updates

**Step 3: Develop with Auto-Generated Types**

When you modify a GraphQL query:

```typescript
// src/hooks/useCreateUser.ts
const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      username # ← Add new field
    }
  }
`);
```

The codegen watch process will:

1. Detect the file change
2. Regenerate types in `src/gql/`
3. Provide immediate TypeScript autocomplete
4. No manual intervention needed!

**Stopping Development:**
Press `Ctrl+C` to stop both Vite and codegen processes

### Development Mode (Simple)

```bash
npm run dev
```

This starts the development server at `http://localhost:5173` with automatic type generation

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
chatter-ui/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   │   ├── Auth.tsx   # Auth wrapper component
│   │   │   ├── Guard.tsx  # Route protection component
│   │   │   ├── Login.tsx  # Login page
│   │   │   └── Signup.tsx # Signup page
│   │   ├── chat-list/     # Chat list components
│   │   │   ├── ChatList.tsx
│   │   │   ├── chat-list-add/
│   │   │   ├── chat-list-header/
│   │   │   └── chat-list-item/
│   │   ├── header/        # Header components
│   │   │   ├── Branding.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileBranding.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Settings.tsx
│   │   ├── snackbar/      # Snackbar notifications
│   │   └── Routes.tsx     # Route configuration
│   ├── constants/         # App constants and configuration
│   │   ├── apollo-client.ts    # Apollo Client setup
│   │   ├── authenticated.ts    # Authentication state
│   │   ├── errors.ts          # Error constants
│   │   ├── excludedRoutes.ts   # Routes to exclude from auth
│   │   ├── snack.ts           # Snackbar state
│   │   └── urls.ts            # API URLs
│   ├── gql/               # Generated GraphQL types (from codegen)
│   │   ├── graphql.ts     # Generated types and documents
│   │   ├── gql.ts         # graphql() function
│   │   ├── fragment-masking.ts
│   │   └── index.ts
│   ├── home/              # Home page
│   │   └── Home.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useCreateUser.ts   # User registration hook
│   │   ├── useGetMe.ts        # Get current user hook
│   │   ├── useLogin.ts        # Login hook
│   │   ├── useLogout.ts       # Logout hook
│   │   └── usePath.ts         # Path utility hook
│   ├── interfaces/        # TypeScript interfaces
│   │   ├── page.interface.ts
│   │   └── snack-message.interface.ts
│   ├── models/            # Data models
│   │   ├── AbstractModel.ts
│   │   └── user.ts
│   ├── utils/             # Utility functions
│   │   ├── errors.ts
│   │   └── logout.ts
│   ├── assets/            # Images and icons
│   │   └── react.svg
│   ├── App.tsx            # Main app component
│   ├── App.css            # App styles
│   └── main.tsx           # Application entry point
├── codegen.ts             # GraphQL Code Generator config
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TS config
├── tsconfig.node.json     # Node/Vite-specific TS config
├── vite.config.ts         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## 🎨 Theme

The application uses Material-UI's dark theme by default. Theme configuration can be found in `src/App.tsx`.

```tsx
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
```

## 📝 Available Routes

- `/` - Home page (protected)
- `/login` - Login page
- `/signup` - Signup page

All routes except `/login` and `/signup` are protected by the `Guard` component and require authentication.

## 🔐 Authentication

The app uses a comprehensive authentication system:

### Custom Hooks

- **useLogin** - Handles user login via GraphQL mutation
- **useCreateUser** - Handles user registration
- **useGetMe** - Fetches current user information
- **useLogout** - Handles user logout

### Components

- **Guard** - Protects routes by checking authentication status
- **Auth** - Wrapper for authentication pages
- **Login** - Login form with email and password
- **Signup** - Registration form

### Session Management

- Uses HTTP-only cookies for secure session management
- Automatic logout on 401 errors
- Apollo Client configured with credentials: 'include'
- Error handling with automatic redirect to login

## 🔧 GraphQL Integration

Apollo Client is configured with:

- **HTTP Link**: Connects to backend GraphQL API
- **Error Link**: Handles logout on authentication errors
- **Credentials**: Includes cookies in cross-origin requests
- **In-Memory Cache**: Efficient data caching
- **Type Generation**: Automatic TypeScript types via GraphQL Code Generator

### Apollo Client Configuration

Configuration can be found in `src/constants/apollo-client.ts`:

```typescript
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL + "/graphql",
  credentials: "include", // Send cookies with requests
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Handle authentication errors
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        // Logout user
      }
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
```

### Writing GraphQL Operations

Use the generated `graphql()` function for type-safe operations:

```typescript
import { graphql } from "../gql";
import { useMutation, useQuery } from "@apollo/client";

// Define a query
const getMeDocument = graphql(`
  query GetMe {
    me {
      _id
      email
    }
  }
`);

// Use the query
const useGetMe = () => {
  return useQuery(getMeDocument);
};
```

**Remember**: Run `npm run codegen` after adding or modifying GraphQL operations!

## 🔧 Configuration

### Environment Variables

The app uses the following environment variables:

- `VITE_API_URL` - Backend API URL (e.g., `http://localhost:3000`)

### TypeScript

- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript settings
- `tsconfig.node.json` - Node/Vite-specific TypeScript settings

### Vite

Configuration can be found in `vite.config.ts`. Default dev server runs on `http://localhost:5173`

### ESLint

Configuration can be found in `eslint.config.js`

## 🏗️ Architecture

### State Management

- **Apollo Client**: Manages server state and GraphQL queries/mutations
- **React Context**: Used via Apollo Provider for global state
- **Local State**: Component-level state with React hooks

### Data Flow

1. User interacts with UI components
2. Custom hooks trigger GraphQL mutations/queries via Apollo Client
3. Apollo Client sends requests to backend with credentials
4. Response data is cached and UI updates automatically
5. Errors are handled by error link, triggering logout if needed

### Component Patterns

- **Container/Presentational**: Separating logic from UI
- **Custom Hooks**: Encapsulating GraphQL operations
- **Guard Pattern**: Protecting routes with authentication checks
- **Error Boundaries**: Handled via Apollo error link

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This will:

1. Run TypeScript compiler (`tsc -b`)
2. Build optimized assets with Vite
3. Output to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

### Deployment Checklist

- [ ] Ensure backend is accessible and running
- [ ] Run `npm run codegen` to generate latest types
- [ ] Set `VITE_API_URL` to production backend URL
- [ ] Ensure backend CORS is configured for frontend domain
- [ ] Build the application with `npm run build`
- [ ] Test the production build with `npm run preview`
- [ ] Deploy `dist/` folder to hosting service (Vercel, Netlify, etc.)
- [ ] Configure routing for single-page application
- [ ] Verify cookies and credentials work in production environment

## 🔐 Security Note

There are 2 vulnerabilities detected in dependencies (1 moderate, 1 high). To address them:

```bash
npm audit fix
# Or for breaking changes:
npm audit fix --force
```

## 🧪 Testing

Currently, the project does not include test files. To add testing:

```bash
# For Vitest (recommended for Vite projects)
npm install -D vitest @testing-library/react @testing-library/jest-dom

# For Jest
npm install -D jest @testing-library/react @testing-library/jest-dom
```

## 🐛 Debugging & Troubleshooting

### Common Issues

#### GraphQL & Network Issues

**Issue**: GraphQL queries fail with network error

- **Solution**: Ensure backend is running and `VITE_API_URL` is correct
- Verify backend is accessible at `http://localhost:3000/graphql`

**Issue**: Automatic logout on every request

- **Solution**: Check backend CORS configuration includes credentials
- Verify cookies are being sent (check browser DevTools > Network > Cookies)

#### Code Generation Issues

**Issue**: GraphQL codegen fails or cannot find schema

- **Solution**:
  - Ensure backend server is running at `http://localhost:3000`
  - Check that `VITE_API_URL` is set correctly in `.env`
  - Verify the GraphQL endpoint is accessible: `http://localhost:3000/graphql`
  - Try running codegen manually: `npm run codegen`

**Issue**: Codegen watch mode not detecting changes

- **Solution**:
  - Check if `npm run dev` is running both processes (you should see logs from both Vite and codegen)
  - Verify the `dev` script uses: `concurrently "vite" "npm run codegen:watch"`
  - Restart the dev server: Stop with Ctrl+C and run `npm run dev` again

**Issue**: Types not updating after query changes

- **Solution**:
  - Save the file containing the GraphQL query
  - Check terminal for codegen output/errors
  - If watch mode isn't working, manually run: `npm run codegen`
  - Restart TypeScript server in VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

**Issue**: Generated types are missing or outdated

- **Solution**:
  - Delete `src/gql/` folder
  - Run `npm run codegen` to regenerate
  - Ensure your GraphQL queries use the `graphql()` function from `src/gql`

#### TypeScript & Import Issues

**Issue**: TypeScript errors like "must be imported using a type-only import"

- **Solution**: This is already fixed in the configuration!
  - `verbatimModuleSyntax` is set to `false` in `tsconfig.app.json`
  - If you still see this error, reload VS Code: `Cmd/Ctrl + Shift + P` → "Developer: Reload Window"

**Issue**: ESLint errors about `import type` vs `import`

- **Solution**: This is already fixed in the configuration!
  - `@typescript-eslint/consistent-type-imports` rule is disabled in `eslint.config.js`
  - Run `npm run lint` to verify no lint errors

**Issue**: Build fails with TypeScript errors

- **Solution**:
  - Run `npm run lint` to check for errors
  - Ensure all types are correctly defined
  - Run `npm run codegen` to regenerate types
  - Check if backend schema matches your queries

#### Development Server Issues

**Issue**: Dev server won't start or crashes immediately

- **Solution**:
  - Check if port 5173 is already in use
  - Ensure Node.js version is 18 or higher: `node --version`
  - Delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`

**Issue**: Changes not reflecting in browser

- **Solution**:
  - Check if HMR is working (you should see updates without full page reload)
  - Hard refresh the browser: `Cmd/Ctrl + Shift + R`
  - Clear browser cache
  - Restart the dev server

### Configuration Files Reference

If you encounter issues, verify these files have the correct configuration:

**`package.json` scripts:**

```json
{
  "scripts": {
    "dev": "concurrently \"vite\" \"npm run codegen:watch\"",
    "codegen": "graphql-codegen --config codegen.ts",
    "codegen:watch": "graphql-codegen --config codegen.ts --watch"
  }
}
```

**`tsconfig.app.json`:**

```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": false // Must be false
  }
}
```

**`eslint.config.js`:**

```javascript
{
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off'  // Must be off
  }
}
```

**`codegen.ts`:**

```typescript
{
  schema: "http://localhost:3000/graphql",  // Backend URL
  documents: "src/**/*.{ts,tsx}",           // Scan both .ts and .tsx
}
```

### Development Tools

- **React DevTools**: Browser extension for React debugging
- **Apollo Client DevTools**: Browser extension for GraphQL debugging
- **Vite DevTools**: Built-in HMR and error overlay

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow existing code patterns
- Use TypeScript strict mode
- Run ESLint before committing
- Write descriptive commit messages

## 📚 Related Projects

- **chatter-backend** - NestJS GraphQL backend API for this application

## � Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [React Router Documentation](https://reactrouter.com/)

## 📄 License

This project is private and not licensed for public use.

---

## 📝 Changelog

### Recent Updates (October 2025)

#### Configuration Improvements

- ✅ **Fixed TypeScript `verbatimModuleSyntax` issue** - Set to `false` in `tsconfig.app.json` to allow flexible import syntax
- ✅ **Disabled ESLint `consistent-type-imports` rule** - Prevents enforcement of `import type` syntax
- ✅ **Added GraphQL Code Generator watch mode** - Automatic type regeneration during development

#### New Scripts & Features

- ✅ **Added `codegen:watch` script** - Run GraphQL codegen in watch mode
- ✅ **Updated `dev` script** - Now runs both Vite and codegen concurrently
- ✅ **Installed `concurrently`** - Enables running multiple processes simultaneously

#### Developer Experience

- ✅ **Automatic type generation** - No need to manually run codegen during development
- ✅ **Reduced import errors** - More flexible import syntax without TypeScript/ESLint complaints
- ✅ **Better documentation** - Comprehensive README with troubleshooting guide

#### Configuration Files Changed

- `package.json` - Added new scripts and concurrently dependency
- `tsconfig.app.json` - Set `verbatimModuleSyntax: false`
- `eslint.config.js` - Disabled `@typescript-eslint/consistent-type-imports`
- `codegen.ts` - Updated to scan both `.ts` and `.tsx` files

### Migration Notes

If you're upgrading from an older version:

1. **Update dependencies:**

   ```bash
   npm install concurrently -D
   ```

2. **Update TypeScript config (`tsconfig.app.json`):**

   ```json
   {
     "compilerOptions": {
       "verbatimModuleSyntax": false
     }
   }
   ```

3. **Update ESLint config (`eslint.config.js`):**

   ```javascript
   {
     rules: {
       '@typescript-eslint/consistent-type-imports': 'off'
     }
   }
   ```

4. **Update `package.json` scripts:**

   ```json
   {
     "scripts": {
       "dev": "concurrently \"vite\" \"npm run codegen:watch\"",
       "codegen:watch": "graphql-codegen --config codegen.ts --watch"
     }
   }
   ```

5. **Restart development server:**
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Development Team

Built with ❤️ using modern web technologies.

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

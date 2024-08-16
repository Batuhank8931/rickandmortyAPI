**This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
**# Rick and Morty API Viewer

## 1. Overview

This project is a web application built with Next.js and Tailwind CSS to view and explore data from the Rick and Morty API. It allows users to browse characters, locations, and episodes from the show with filtering options.

## 2. Prerequisites

- Node.js (version 14.x or higher recommended)
- npm (comes with Node.js) or yarn

## 3. Installation

### 3.1 Clone the Repository

git clone https://github.com/yourusername/rick-and-morty-api-viewer.git
cd rick-and-morty-api-viewer

### 3.2 Install Dependencies

If you're using npm:

npm install

If you're using yarn:

yarn install

## 4. Running the Application

### 4.1 Start the Development Server

npm run dev

or

yarn dev

This command will start the development server. The application will be accessible at `http://localhost:3000`.

### 4.2 Building for Production

To create an optimized production build, run:

npm run build

or

yarn build

The output will be located in the `.next` directory. You can start the production server using:

npm run start

or

yarn start

### 4.3 Linting

To lint the code, run:

npm run lint

or

yarn lint

## 5. Project Structure

- `pages/` - Contains the pages of the application, including the home, characters, locations, and episodes pages.
- `components/` - (If applicable) Reusable UI components.
- `public/` - Static assets like images.
- `styles/` - Global styles, mainly `globals.css` for Tailwind setup.
- `app/` - Main application logic, including the new Next.js App Router structure.

## 6. API Reference

This application uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch data.

## 7. Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 8. License

This project is open source and available under the [MIT License](LICENSE).

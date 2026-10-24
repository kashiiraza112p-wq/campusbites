# Campus Bites — React Canteen Menu

A responsive campus-canteen frontend built with React, Vite and React Router. Menu records are loaded at runtime from `public/menu.json` using `fetch`, `useEffect` and `async/await`.

## Features
- Responsive phone, tablet and desktop layouts using CSS Grid, Flexbox and media queries
- Reusable `MenuList`, `ItemCard` and `Cart` components
- Search, category filters and a favourite toggle
- Menu and item-detail routes plus a cart route
- Shared cart state through React Context; header count, item quantities and total update immediately
- Loading and error states for menu loading
- Demo checkout (no real payment or backend)

## Run locally
1. Install Node.js LTS from https://nodejs.org/ if you do not already have it.
2. Extract the project zip and open the `campus-canteen` folder in VS Code.
3. Open the terminal in that folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL Vite prints, usually `http://localhost:5173`.

If PowerShell blocks `npm.ps1`, use `npm.cmd install` and `npm.cmd run dev`.

## Edit the menu
Change the objects in `public/menu.json`. Each item has `id`, `name`, `category`, `price`, `emoji`, `tag` and `description`. Keep the JSON valid.

## Suggested screen-recording checklist (30–45 seconds)
1. Start on Menu and show the full menu.
2. Search for “coffee”, then clear the search and choose “Drinks”.
3. Tap the heart on an item, then use the Favourites filter.
4. Open an item detail page and add it to the order.
5. Show the header cart count changing without a reload.
6. Open Your order, increase quantity and show the total updating.

Record your own screen with Windows Snipping Tool (Screen recording), Xbox Game Bar (`Win + G`) or another screen recorder. The project is supplied; a recording needs to be captured from your running browser to show the actual interaction.

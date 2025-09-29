# Sudoku Zen

A minimalist and visually stunning Sudoku game for the modern web, designed for a focused and relaxing experience.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/archiephan78/generated-app-20250929-172315)

## About The Project

Sudoku Zen is a modern, minimalist, and visually stunning web-based Sudoku game. Designed for a focused and relaxing experience, it provides a classic 9x9 Sudoku puzzle experience with a clean, intuitive interface. The application features multiple difficulty levels, an interactive grid for number input, a dedicated number keypad, and a 'pencil' mode for making notes.

The entire application is built on a responsive, mobile-first design, ensuring a seamless experience across all devices. The visual design emphasizes clarity and elegance, using a calm color palette, generous whitespace, and subtle animations to create a delightful user experience.

## Key Features

-   **Classic 9x9 Sudoku:** Enjoy the timeless puzzle game.
-   **Multiple Difficulty Levels:** Choose from Easy, Medium, Hard, and Expert.
-   **Interactive Grid:** A beautiful and responsive grid for seamless gameplay.
-   **Notes Mode:** Use the 'pencil' feature to jot down potential numbers.
-   **Real-time Validation:** Instantly see conflicts in rows, columns, and 3x3 boxes.
-   **Hint System:** Get a little help when you're stuck.
-   **Game Timer & Error Counter:** Track your progress and accuracy.
-   **Responsive Design:** Flawless gameplay on desktop, tablet, and mobile devices.
-   **Elegant UI:** A clean, uncluttered interface designed for focus and relaxation.

## Technology Stack

This project is built with a modern, high-performance tech stack:

-   **Framework:** React (with Vite)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **State Management:** Zustand
-   **Icons:** Lucide React
-   **Animation:** Framer Motion
-   **Deployment:** Cloudflare Workers

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/sudoku_zen.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd sudoku_zen
    ```
3.  Install dependencies:
    ```sh
    bun install
    ```

### Running Locally

To start the development server, run the following command:

```sh
bun run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal) to see the application in action.

## Development

The project is structured to separate concerns, making it easy to maintain and extend.

-   `src/pages/`: Contains the main view of the application.
-   `src/components/sudoku/`: Houses all the Sudoku-specific UI components (`SudokuGrid`, `SudokuCell`, `Controls`, `Keypad`).
-   `src/lib/sudoku.ts`: Encapsulates all core game logic, including puzzle generation, validation, and solving.
-   `src/stores/sudoku-store.ts`: Defines the Zustand store for managing the entire game state.

## Deployment

This application is designed for easy deployment to Cloudflare's global network.

1.  **Log in to Cloudflare:**
    If you haven't already, authenticate with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```
2.  **Deploy the application:**
    Run the deploy script to build and publish your application.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/archiephan78/generated-app-20250929-172315)
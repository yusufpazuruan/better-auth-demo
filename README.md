# Welcome to better-auth demo

[Better-Auth](https://better-auth.com) is a TypeScript first authentication framerwork for web. It supports all the major frameworks. This repository showcases the implementation of a secure authentication system, combining traditional email-password login with modern OAuth and two-step verification for enhanced security.

## Features

### 1. **Email-Password Authentication**

- Allows user to sign-up and sign-in using their email and password.

### 2. **OAuth Integration**

- Integration with third-party providers for login, including:
  - Google
  - GitHub

### 3. **Two-Step Verification**

- User has option to enable two-step verification using an authenticator app.
- Generates and validates time-based one-time passwords (TOTP) from apps like Google Authenticator or Samsung Pass.

### Prerequisites

- [Node.js](https://nodejs.org) (v20 or above) installed
- [npm](https://npmjs.com) or [bun](https:bun.sh) or [pnpm](https://pnpm.io) installed

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/imredoyyy/better-auth-demo.git
    cd better-auth-demo
    ```
2.  Install dependencies:

    ```bash
    npm install --legacy-peer-deps
    # or
    bun install
    # or
    pnpm install
    ```

3.  Create a .env.local file in the root directory and configure the following variables:

    ```bash
    # Better Auth Config
    BETTER_AUTH_SECRET=<your_secret>
    BETTER_AUTH_URL="https://localhost:3000"

    # Databse URL
    POSTGRES_URL=<your_postgres_db_url>

    GOOGLE_CLIENT_ID=<google_client_id>
    GOOGLE_CLIENT_SECRET=<google_client_secret>
    GITHUB_CLIENT_ID=<github_client_id>
    GITHUB_CLIENT_SECRET=<github_client_secret>
    ```

4.  Run the application:

    ```bash
    npm run dev
    #or
    bun dev
    #or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# My Next.js E-commerce Web App

## Overview

This is a simple e-commerce web app built with Next.js. It allows users to:

- View a homepage with a header, hero section, and a slideshow of new arrivals.
- Browse products on a separate page.
- Select a product to view its details and fill out a form to place an order.
- Submit the order form and receive an email verification.

## Features

- **No login required**: Users can access the site directly.
- **Responsive design**: Works on both desktop and mobile devices.
- **Dynamic product data**: Products are loaded from a static JSON file.
- **Order submission**: Users can submit their order details via a form.
- **Email verification**: Users receive a confirmation email upon submission.

## File Structure

The project follows a modular file structure:

- `components/`: Contains reusable components like `Header`, `Hero`, and `ProductCard`.
- `pages/`: Contains Next.js pages (`index.js` for the homepage, `products.js` for product listing, and `submit.js` for order confirmation).
- `styles/`: Includes global and module-specific CSS files.
- `utils/`: Includes helper functions, such as email-sending logic.
- `data/`: Stores static JSON files for product data.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DrLivesey-Shura/update-wear.git
   ```

2. Navigate to the project directory:

   ```bash
   cd update-wear
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.
Open [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard) in your browser to view the admin side.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

### Environment Variables

To enable email verification, create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

EMAIL_USER=your_email
EMAIL_APP_PASSWORD=your_email_app_password

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

### Deployment

Deploy the app to a platform like Vercel:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Configure environment variables in Vercel.


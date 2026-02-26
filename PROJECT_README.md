# Blue Bell Gifts Frontend - Customer Website

This is the **Frontend** for Blue Bell Gifts - a separate React project dedicated to the customer-facing e-commerce website where users can browse products, manage carts, place orders, and track shipments.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── customer/       # Customer-facing components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── figma/          # Figma components
│   │   │   └── ui/             # Shared UI components (Radix UI)
│   │   ├── context/            # App context for state management
│   │   ├── services/           # Firebase, Auth, Firestore services
│   │   ├── types/              # TypeScript type definitions
│   │   ├── data/               # Mock/static data
│   │   └── App.tsx             # Frontend app component
│   ├── styles/                 # Global styles
│   └── main.tsx                # Entry point
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS config
└── tsconfig.json               # TypeScript config
```

## Features

- 🏠 **Home Page** - Featured products and categories
- 🏷️ **Categories** - Browse products by category
- 📦 **Products** - Product listing with filters
- 🔍 **Search** - Find products quickly
- 🛒 **Shopping Cart** - Add/remove items
- 💳 **Checkout** - Complete purchase
- 👤 **Account** - User profile and addresses
- 📋 **Order History** - Track orders
- ⭐ **Wishlist** - Save favorite items
- 🚚 **Order Tracking** - Track shipment status
- 📞 **Contact** - Support and inquiries
- 📄 **Static Pages** - About, Terms, Privacy, Refund Policy

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Firebase credentials (.env file)

### Installation Steps

1. **Clone and navigate to frontend**

   ```bash
   cd frontend
   npm install
   ```

2. **Create .env file**
   Copy `.env.example` to `.env` and add your Firebase credentials:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server (Vite)
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Firebase** - Backend services
- **React Hook Form** - Form management
- **React DnD** - Drag and drop

## Firebase Integration

This project uses Firebase for:

- User Authentication (Email, Google)
- Firestore (Database - Products, Orders, User Data)
- Cloud Storage (Product Images)

## Features in Detail

### Shopping Experience

- Browse and filter products
- Add items to cart
- Save items to wishlist
- Responsive design for mobile and desktop

### User Accounts

- Create account with email
- Google sign-in
- Manage profiles and addresses
- Order history and tracking
- Wishlist management

### Checkout

- Cart management
- Address selection/creation
- Payment integration ready
- Order confirmation

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

### Build and Deploy Manually

```bash
npm run build
# Upload the 'dist' folder to your hosting service
```

## Important Notes

- **This is a separate project** from the admin panel. Frontend and admin panel run independently.
- **Shared Services**: Both projects share Firebase configuration and services.
- **User Authentication**: Customers can register and login with email or Google.
- **Environment Variables**: Make sure `.env` file is properly configured.

## Troubleshooting

### Components not rendering

- Check browser console for errors
- Verify Firebase credentials in `.env`
- Clear browser cache

### Cart data not persisting

- Check if user is logged in
- Verify Firestore rules allow user cart operations
- Check browser localStorage for local cart

### Build errors

- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: Review tsconfig.json
- Ensure all imports are correct

## Performance Tips

- Images are optimized with lazy loading
- Components use React.memo for optimization
- CSS is scoped with Tailwind
- Vite provides fast development experience

## SEO

The app includes:

- Meta tags in index.html
- Proper heading structure
- Semantic HTML elements
- Fast loading times (Vite optimized)

## Support

For issues or questions, please refer to the main project documentation or Firebase documentation.

## License

MIT

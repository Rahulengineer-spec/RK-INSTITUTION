# RK INSTITUTION Learning Management System

A modern, feature-rich learning management system built with Next.js 13, React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 📚 Learning Management
- Interactive course content delivery
- Real-time collaboration tools
- Progress tracking and analytics
- Assignment submission and grading
- Student performance monitoring

### 🔐 Authentication & Authorization
- Secure authentication with NextAuth
- Role-based access control (Admin, Teacher, Student)
- Protected routes and API endpoints
- Social login options
- Advanced client-side validation

### 📊 Dashboard
- Personalized user dashboards
- Real-time analytics and progress tracking
- Interactive study group management
- Performance comparison tools
- Weekly study progress visualization

### 💼 Marketing Site
- Modern, responsive landing page
- Feature showcase with interactive elements
- Transparent pricing plans
- Comprehensive footer with quick links
- Loading states with skeleton placeholders

### 🎨 UI/UX Features
- Modern, clean interface
- Responsive design for all devices
- Dark/Light mode support
- Loading states and animations
- Error boundaries for robust error handling
- Accessibility compliance

## 🛠️ Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** Supabase
- **UI Components:** shadcn/ui
- **State Management:** React Context + Hooks
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide Icons

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rk-institution.git
   cd rk-institution
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install qrcode html5-qrcode @types/qrcode sonner
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
rk-institution/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # Dashboard views
│   ├── marketing/    # Marketing pages
│   └── ...
├── components/       # Reusable components
├── lib/             # Utility functions
├── styles/          # Global styles
└── types/           # TypeScript types
```

## 🔒 Authentication Flow

1. Users can sign up/login via email/password or social providers
2. Protected routes require authentication
3. Role-based access control for different user types
4. Secure session management with NextAuth

## 🎯 Key Features in Detail

### Marketing Pages
- Landing page with hero section
- Feature showcase
- Pricing plans
- Contact information
- Loading states

### Dashboard
- Role-specific views
- Analytics and progress tracking
- Interactive UI elements
- Real-time updates

### Authentication
- Multiple auth methods
- Secure session handling
- Protected routes
- User role management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@rkinstitution.com or join our Slack channel.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [NextAuth.js](https://next-auth.js.org/)

"use client"

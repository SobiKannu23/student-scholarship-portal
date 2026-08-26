import { Link } from "react-router-dom";
import Button from "../components/Button";

const features = [
  {
    title: "Unified Scholarship Tracking",
    description: "Track every scholarship application you submit across departments in one place.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Real-Time Application Journey",
    description: "Follow your application from submission to fund disbursement with live status updates.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Digital Document Locker",
    description: "Upload documents once and reuse them across multiple scholarship schemes.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7a2 2 0 012-2h2a2 2 0 012 2v10M5 21h14a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0014.586 3H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Opportunity Calendar",
    description: "Never miss a deadline with a calendar of upcoming scholarship windows.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "8+", label: "Active Scholarships" },
  { value: "50,000+", label: "Students Registered" },
  { value: "38", label: "Districts Covered" },
  { value: "Rs. 12 Cr+", label: "Disbursed to Date" },
];

const steps = [
  { number: "01", title: "Create Your Profile", description: "Register and complete your academic, family, and residence details." },
  { number: "02", title: "Browse & Apply", description: "Find scholarships you qualify for and apply in a simple 2-step process." },
  { number: "03", title: "Track & Receive", description: "Follow your application's journey and get notified upon approval." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top identity bar */}
      <div className="bg-blue-950 text-blue-100 text-xs">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span>Government of Tamil Nadu</span>
          <span className="hidden sm:inline">Directorate of Collegiate Education</span>
        </div>
      </div>

      {/* Header / Nav */}
      <header className="bg-blue-900 text-white shadow-sm sticky top-0 z-30">
                <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-blue-950 font-bold text-lg flex-shrink-0">
              TN
            </div>
            <div>
              <p className="text-base font-semibold leading-tight">Student Scholarship Portal</p>
              <p className="text-xs text-blue-200 leading-tight">Government of Tamil Nadu</p>
            </div>
          </div>
                      <div className="flex gap-2">
            <Link to="/login">
              <Button className="bg-transparent text-white border-2 border-white/70 hover:bg-white/10 hover:border-white font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-transparent text-white border-2 border-white/70 hover:bg-white/10 hover:border-white font-semibold">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400"></div>
          <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-blue-300"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
          <span className="inline-block bg-white/10 text-blue-100 text-xs font-medium px-3 py-1 rounded-full mb-5 border border-white/20">
            Official State-Level Scholarship Platform
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl mx-auto">
            One Portal for Every Scholarship in Tamil Nadu
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-9 leading-relaxed">
            Apply, track, and manage government and private scholarships from a single,
            secure, student-first dashboard — built for every student across the state.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/register">
              <Button className="bg-amber-500 text-blue-950 hover:bg-amber-400 border-0 font-semibold px-6 py-3 text-base w-full sm:w-auto">
                Get Started as Student
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/30 font-semibold px-6 py-3 text-base w-full sm:w-auto">
                Officer Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold text-blue-900">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-amber-600 text-xs font-semibold tracking-wide uppercase">Why This Portal</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
            Everything You Need, In One Place
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-xs font-semibold tracking-wide uppercase">Simple Process</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center md:text-left">
                <span className="text-5xl font-bold text-blue-100 block mb-2">{step.number}</span>
                <h3 className="text-base font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Ready to Begin Your Scholarship Journey?
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">
          Join thousands of students across Tamil Nadu who are tracking and applying for
          scholarships through this portal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/register">
            <Button className="bg-blue-900 text-white hover:bg-blue-800 border-0 font-semibold px-6 py-3 text-base w-full sm:w-auto">
              Register as Student
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="px-6 py-3 text-base w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-200">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Government of Tamil Nadu — Student Scholarship Portal</p>
          <p className="text-blue-400">Demo Application — For Educational Purposes Only</p>
        </div>
      </footer>
    </div>
  );
}
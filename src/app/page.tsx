'use client'

import { BookOpen, Calculator, CheckCircle, Users, Award, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/images/exceed-logo.png" alt="Exceed Learning Logo" className="h-12 md:h-16" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('schedule')}
              className="text-[#0e1f3e] hover:text-[#ca3433] font-semibold transition-colors"
            >
              Schedule
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-[#0e1f3e] hover:text-[#ca3433] font-semibold transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="bg-[#ca3433] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#b32f2e] transition-all"
            >
              Enroll Now
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0e1f3e]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('schedule')}
                className="block w-full text-left text-[#0e1f3e] hover:text-[#ca3433] font-semibold transition-colors py-2"
              >
                Schedule
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-[#0e1f3e] hover:text-[#ca3433] font-semibold transition-colors py-2"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full bg-[#ca3433] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#b32f2e] transition-all text-center"
              >
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0e1f3e] to-[#1a2f4f] text-white py-20 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            State Exam Prep for<br />Grades 3–8
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            <span className="font-semibold text-[#f7e0e0]">Coming Soon for 2027</span>
          </p>
          <p className="text-lg md:text-xl mb-10 text-gray-300">
            Registration opens soon
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('pricing')}
              className="bg-white text-[#ca3433] px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Enroll Now
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#0e1f3e] transition-all"
            >
              See Schedule
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl font-bold text-[#f7e0e0] mb-2">2027 Program</p>
            <p className="text-lg text-gray-300">Stay tuned for dates and registration details</p>
          </div>
        </div>
      </section>

      {/* Overview / Why Join */}
      <section className="py-16 px-6 bg-[#f7e0e0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0e1f3e] text-center mb-12">
            Why Join Our Program?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-[#ca3433] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0e1f3e] mb-3">Boost Confidence</h3>
              <p className="text-gray-600">
                Build test-taking skills and confidence through structured practice and expert guidance
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-[#0e1f3e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0e1f3e] mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced educators who understand state exam requirements inside and out
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-[#ca3433] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0e1f3e] mb-3">Structured Reviews</h3>
              <p className="text-gray-600">
                Comprehensive curriculum covering all essential topics and test-taking strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0e1f3e] text-center mb-4">
            Program Pricing
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Choose the package that works best for your student
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#ca3433] transition-all">
              <div className="text-center mb-6">
                <BookOpen className="w-12 h-12 text-[#ca3433] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0e1f3e] mb-2">ELA Only</h3>
                <div className="text-5xl font-bold text-[#ca3433] mb-2">$329</div>
                <p className="text-gray-600">Complete ELA prep</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#ca3433] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Weekly ELA sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#ca3433] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Practice materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#ca3433] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Progress tracking</span>
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/6oU6oAg8IcEq1lDcsPdfG0c"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#ca3433] text-white py-3 rounded-lg font-bold hover:bg-[#b32f2e] transition-all text-center"
              >
                Enroll in ELA
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#ca3433] transition-all">
              <div className="text-center mb-6">
                <Calculator className="w-12 h-12 text-[#0e1f3e] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0e1f3e] mb-2">Math Only</h3>
                <div className="text-5xl font-bold text-[#ca3433] mb-2">$429</div>
                <p className="text-gray-600">Complete Math prep</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0e1f3e] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Weekly Math sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0e1f3e] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Practice problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0e1f3e] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Progress tracking</span>
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/6oU6oAg8IcEq1lDcsPdfG0c"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#0e1f3e] text-white py-3 rounded-lg font-bold hover:bg-[#1a2f4f] transition-all text-center"
              >
                Enroll in Math
              </a>
            </div>

            <div className="bg-gradient-to-br from-[#ca3433] to-[#d14544] p-8 rounded-xl shadow-xl border-4 border-[#ca3433] relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#0e1f3e] text-white px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </div>
              <div className="text-center mb-6 text-white">
                <div className="flex justify-center gap-2 mb-4">
                  <BookOpen className="w-10 h-10" />
                  <Calculator className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Both Subjects</h3>
                <div className="text-5xl font-bold mb-2">$700</div>
                <p className="text-white/90">Complete exam prep</p>
                <p className="text-sm text-white/80 mt-2">Save $58!</p>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>All ELA & Math sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Complete materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/6oU6oAg8IcEq1lDcsPdfG0c"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-[#ca3433] py-3 rounded-lg font-bold hover:bg-gray-100 transition-all text-center"
              >
                Enroll Both Subjects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-16 px-6 bg-[#f7e0e0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0e1f3e] text-center mb-4">
            Schedule by Grade
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Choose the sessions designed specifically for your grade level
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#0e1f3e] to-[#1a2f4f] p-8 rounded-xl shadow-xl text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Grades 3–4</h3>
                <div className="w-16 h-1 bg-[#ca3433] mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-[#f7e0e0]" />
                      <span className="font-bold text-[#f7e0e0]">ELA</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">6 weeks</span>
                  </div>
                  <div className="text-sm text-gray-300 mt-2">TBD 2027</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-[#f7e0e0]" />
                      <span className="font-bold text-[#f7e0e0]">Math</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">8 weeks</span>
                  </div>
                  <div className="text-sm text-gray-300 mt-2">TBD 2027</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#ca3433] to-[#d14544] p-8 rounded-xl shadow-xl text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Grades 5–6</h3>
                <div className="w-16 h-1 bg-white mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-bold">ELA</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">6 weeks</span>
                  </div>
                  <div className="text-sm text-white/80 mt-2">TBD 2027</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-5 h-5" />
                      <span className="font-bold">Math</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">8 weeks</span>
                  </div>
                  <div className="text-sm text-white/80 mt-2">TBD 2027</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0e1f3e] to-[#1a2f4f] p-8 rounded-xl shadow-xl text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Grades 7–8</h3>
                <div className="w-16 h-1 bg-[#ca3433] mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-[#f7e0e0]" />
                      <span className="font-bold text-[#f7e0e0]">ELA</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">6 weeks</span>
                  </div>
                  <div className="text-sm text-gray-300 mt-2">TBD 2027</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-[#f7e0e0]" />
                      <span className="font-bold text-[#f7e0e0]">Math</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">8 weeks</span>
                  </div>
                  <div className="text-sm text-gray-300 mt-2">TBD 2027</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0e1f3e] to-[#1a2f4f] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Help Your Student Succeed?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Don&apos;t wait until the last minute. Enroll now and give your student the best chance to excel.
          </p>
          <button
            onClick={() => scrollToSection('pricing')}
            className="bg-[#ca3433] text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-[#b32f2e] transition-all transform hover:scale-105 shadow-lg"
          >
            Enroll Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e1f3e] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="bg-[#ca3433] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">Phone Number:</p>
                <a href="tel:+15162263114" className="text-white font-semibold hover:text-[#f7e0e0] transition-colors">+1 (516) 226-3114</a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="bg-[#ca3433] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">Our Location:</p>
                <span className="text-white font-semibold">1360 Willis Ave., Albertson NY 11507</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="bg-[#ca3433] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">Email Address:</p>
                <a href="mailto:info@exceedlearning.com" className="text-white font-semibold underline hover:text-[#f7e0e0] transition-colors">
                  Email us directly [+]
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center text-gray-400 text-sm">
            © 2027 Exceed Learning. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#ca3433] text-white p-4 rounded-full shadow-lg hover:bg-[#b32f2e] transition-all transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

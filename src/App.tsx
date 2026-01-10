import { BookOpen, Calculator, CheckCircle, Clock, Users, Award, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const examDate = new Date('2026-04-14T00:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = examDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      lenisInstance.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80 });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0e1f3e] to-[#1a2f4f] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            State Exam Prep for<br />Grades 3–8
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            Exam Date: <span className="font-semibold text-[#f7e0e0]">April 14</span>
          </p>
          <p className="text-lg md:text-xl mb-10 text-gray-300">
            Reviews Start: <span className="font-semibold">March 8</span>
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

          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-wide mb-3 text-gray-300">Time Until Exam</p>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#f7e0e0]">{timeLeft.days}</div>
                <div className="text-xs md:text-sm text-gray-300">Days</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#f7e0e0]">{timeLeft.hours}</div>
                <div className="text-xs md:text-sm text-gray-300">Hours</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#f7e0e0]">{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm text-gray-300">Minutes</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#f7e0e0]">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm text-gray-300">Seconds</div>
              </div>
            </div>
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

      {/* Grade & Schedule Breakdown */}
      <section id="schedule" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0e1f3e] text-center mb-4">
            Schedule by Grade
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Choose the sessions designed specifically for your grade level
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Grades 3-4 */}
            <div className="bg-gradient-to-br from-[#0e1f3e] to-[#1a2f4f] p-8 rounded-xl shadow-xl text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Grades 3–4</h3>
                <div className="w-16 h-1 bg-[#ca3433] mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-[#f7e0e0]" />
                    <span className="font-bold text-[#f7e0e0]">ELA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Mondays • 4–5 PM</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-5 h-5 text-[#f7e0e0]" />
                    <span className="font-bold text-[#f7e0e0]">Math</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Wednesdays • 4–5 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grades 5-6 */}
            <div className="bg-gradient-to-br from-[#ca3433] to-[#d14544] p-8 rounded-xl shadow-xl text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Grades 5–6</h3>
                <div className="w-16 h-1 bg-white mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-bold">ELA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Tuesdays • 4–5 PM</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-5 h-5" />
                    <span className="font-bold">Math</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Thursdays • 4–5 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grades 7-8 */}
            <div className="bg-gradient-to-br from-[#0e1f3e] to-[#1a2f4f] p-8 rounded-xl shadow-xl text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Grades 7–8</h3>
                <div className="w-16 h-1 bg-[#ca3433] mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-[#f7e0e0]" />
                    <span className="font-bold text-[#f7e0e0]">ELA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Mondays • 5–6 PM</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-5 h-5 text-[#f7e0e0]" />
                    <span className="font-bold text-[#f7e0e0]">Math</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Fridays • 5–6 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 bg-[#f7e0e0]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0e1f3e] text-center mb-4">
            Program Pricing
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Choose the package that works best for your student
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ELA Only */}
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
              <button className="w-full bg-[#ca3433] text-white py-3 rounded-lg font-bold hover:bg-[#b32f2e] transition-all">
                Enroll in ELA
              </button>
            </div>

            {/* Math Only */}
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
              <button className="w-full bg-[#0e1f3e] text-white py-3 rounded-lg font-bold hover:bg-[#1a2f4f] transition-all">
                Enroll in Math
              </button>
            </div>

            {/* Both Subjects */}
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
              <button className="w-full bg-white text-[#ca3433] py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
                Enroll Both Subjects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0e1f3e] text-center mb-12">
            What Parents Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f7e0e0] p-6 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#ca3433] text-[#ca3433]" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "My daughter's confidence soared after joining this program. The instructors are amazing!"
              </p>
              <p className="font-semibold text-[#0e1f3e]">— Sarah M., Parent of 5th Grader</p>
            </div>

            <div className="bg-[#f7e0e0] p-6 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#ca3433] text-[#ca3433]" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The structured approach really helped my son prepare. He felt ready on exam day!"
              </p>
              <p className="font-semibold text-[#0e1f3e]">— Michael T., Parent of 7th Grader</p>
            </div>

            <div className="bg-[#f7e0e0] p-6 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#ca3433] text-[#ca3433]" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Worth every penny! The progress we saw in just a few weeks was incredible."
              </p>
              <p className="font-semibold text-[#0e1f3e]">— Jennifer L., Parent of 4th Grader</p>
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
            Don't wait until the last minute. Enroll now and give your student the best chance to excel.
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
      <footer className="bg-[#0e1f3e] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300">
            © 2026 State Exam Prep Program. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

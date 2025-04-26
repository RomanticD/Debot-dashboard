import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '~/components/Graph/context/ThemeContext';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/graphs/')({
  component: GraphsIndexComponent,
})

function GraphsIndexComponent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [animatedText, setAnimatedText] = useState("");
  const [gradientPosition, setGradientPosition] = useState(0);
  const fullText = "Debot Daily Dashboard";
  
  // Text typing animation effect
  useEffect(() => {
    if (animatedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setAnimatedText(fullText.slice(0, animatedText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [animatedText]);
  
  // Gradient animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 200);
    }, 20);
    
    return () => clearInterval(interval);
  }, []);
  
  // Dynamic gradient style
  const gradientStyle = {
    backgroundImage: isDark 
      ? `linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd, #3b82f6)`
      : `linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa, #2563eb)`,
    backgroundSize: '200% 100%',
    backgroundPosition: `${gradientPosition}% 0%`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    transition: 'all 0.3s ease',
  };

  // Animation styles using CSS objects
  const floatKeyframes = {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' }
  };

  const blinkKeyframes = {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0 }
  };

  const fadeInKeyframes = {
    'from': { opacity: 0, transform: 'translateY(20px)' },
    'to': { opacity: 1, transform: 'translateY(0)' }
  };

  const floatAnimation = {
    animation: 'float 3s ease-in-out infinite',
  };

  const blinkAnimation = {
    animation: 'blink 1s step-end infinite',
  };

  const fadeInAnimation = {
    animation: 'fadeIn 1s ease-out forwards',
  };
  
  return (
    <div className={`p-6 md:p-8 lg:p-10 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg transition-all duration-300`}>
      {/* Hero Section */}
      <div className="mb-12 text-center relative overflow-hidden">
        <h1 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div style={{ padding: '10px 0', minHeight: '80px', display: 'inline-block' }}>
            <span 
              style={{
                ...gradientStyle,
                animation: 'float 3s ease-in-out infinite',
                display: 'inline-block',
                padding: '0 4px',
              }} 
              className="font-extrabold relative"
            >
              {animatedText}
              <span 
                style={animatedText.length === fullText.length ? blinkAnimation : { opacity: 0 }}
                className="absolute right-0 top-0 h-full w-[2px]"
              ></span>
            </span>
          </div>
        </h1>
        <p 
          style={fadeInAnimation} 
          className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          基于React, Tanstack和Encharts开发，支持路由聚合，前端缓存，和多维数据灵活展示.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Feature 1 */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg transform transition hover:scale-[1.02]`}>
          <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Interactive Charts</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Create dynamic, responsive charts that bring your data to life with smooth interactions.
          </p>
        </div>

        {/* Feature 2 */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg transform transition hover:scale-[1.02]`}>
          <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Real-time Analytics</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Monitor metrics in real-time with automatic updates and responsive dashboards.
          </p>
        </div>

        {/* Feature 3 */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg transform transition hover:scale-[1.02]`}>
          <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Customizable</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Personalize every aspect of your visualizations with intuitive, powerful controls.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className={`text-center p-8 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg mb-8`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Ready to explore?
        </h2>
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Select a graph type from the sidebar to start visualizing your data in beautiful, meaningful ways. If you have any questions. feel free to contact <span className={`font-bold animate-pulse transition-all duration-500 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Qiu Junyi</span>
        </p>
        <div className={`inline-block px-6 py-3 rounded-lg text-white font-medium transition-colors ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
          Get Started
        </div>
      </div>

      {/* Brand Section */}
      <div className="text-center">
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Copyright @2025 Debot.AI.
        </p>
      </div>
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

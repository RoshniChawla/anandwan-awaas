import React, { useEffect } from "react";
import { Languages } from "lucide-react";

// Add TypeScript declaration for Google Translate
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: any, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const LanguageSwitcher = () => {
  useEffect(() => {
    // Add Google Translate script
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Add custom styles to hide Google Translate elements
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        .goog-te-gadget {
          font-family: inherit !important;
          color: inherit !important;
        }
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-size: inherit !important;
          color: inherit !important;
          line-height: inherit !important;
        }
        .goog-te-gadget-icon {
          display: none !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-te-combo {
          background: transparent;
          border: none;
          color: inherit;
          font-family: inherit;
          font-size: 14px;
          padding: 4px 8px;
          cursor: pointer;
          outline: none;
        }
        .goog-te-combo:hover {
          opacity: 0.8;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,mr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        },
        'google_translate_element'
      );
    };

    addCustomStyles();
    addGoogleTranslateScript();

    return () => {
      // Cleanup function
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) {
        document.body.removeChild(script);
      }
      const style = document.querySelector('style');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-gray-700" />
      <div id="google_translate_element"></div>
    </div>
  );
};

export default LanguageSwitcher; 
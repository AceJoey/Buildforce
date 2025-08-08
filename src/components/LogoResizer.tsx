import React, { useState } from 'react';
import buildforceLogo from '../assets/BUILDFORCE_Logo_-_Clean_and_Simple_Integration-removebg-preview.png';

interface LogoResizerProps {
  onSizeChange: (size: number) => void;
  currentSize: number;
}

export default function LogoResizer({ onSizeChange, currentSize }: LogoResizerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        title="Logo Size Settings"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo Size</h3>
          
          {/* Preview */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-center">
              <img 
                src={buildforceLogo} 
                alt="BuildForce Logo Preview" 
                className="w-auto"
                style={{ height: `${currentSize}px` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Current size: {currentSize}px
            </p>
          </div>

          {/* Slider */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Height (px)
            </label>
            <input
              type="range"
              min="20"
              max="150"
              value={currentSize}
              onChange={(e) => onSizeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20px</span>
              <span>70px</span>
              <span>120px</span>
            </div>
          </div>

          {/* Quick Size Buttons */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => onSizeChange(40)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Small
            </button>
            <button
              onClick={() => onSizeChange(60)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Medium
            </button>
            <button
              onClick={() => onSizeChange(100)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Large
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={() => {
              localStorage.setItem('logoSize', currentSize.toString());
              setIsOpen(false);
            }}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Size
          </button>
        </div>
      )}
    </div>
  );
} 
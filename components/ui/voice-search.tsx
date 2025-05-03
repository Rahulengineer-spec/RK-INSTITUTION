"use client"

import React, { useState, useRef } from 'react';

interface VoiceSearchButtonProps {
  onResult: (text: string) => void;
  className?: string;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ onResult, className }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Polyfill for SpeechRecognition
  const SpeechRecognition =
    typeof window !== 'undefined'
      ? (window.SpeechRecognition || (window as any).webkitSpeechRecognition)
      : undefined;

  const handleStart = () => {
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      onResult(transcript);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const handleStop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <button
      type="button"
      aria-label={listening ? 'Stop voice search' : 'Start voice search'}
      onClick={listening ? handleStop : handleStart}
      className={`inline-flex items-center justify-center rounded-full p-2 bg-muted hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    >
      {listening ? (
        <span className="animate-pulse text-primary">🎤</span>
      ) : (
        <span className="text-muted-foreground">🎤</span>
      )}
    </button>
  );
}; 
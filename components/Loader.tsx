'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Loading your data',
  'Counting things that already happened',
  'Staring at the numbers',
  'Asking the numbers to explain themselves',
  'Trying to remember what this charge was',
  'Following the trail of receipts',
  'Putting the chaos in rows',
  'Sorting the mess',
  'Making it look official',
  'Replaying past purchases',
  'Looking for patterns',
  'Finding patterns where none exist',
  'Connecting dots aggressively',
  'Checking if this is normal',
  'This seems familiar',
  'This happens more than you think',
  'Judging nothing. Observing everything.',
  'Aligning the data',
  'Reconciling vibes with math',
  'Double-checking the obvious',
  'Verifying that numbers are numbers',
  'Confirming that this did, in fact, happen',
  'Almost done',
  'Almost almost done',
  'Still loading',
];

function randomMessage() {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
}

function LoaderSVG() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading"
      role="img"
    >
      <rect x="4" y="28" width="6" height="14" rx="1" fill="currentColor" opacity="0.4">
        <animate attributeName="height" values="14;22;14" dur="1s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="y" values="28;20;28" dur="1s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1s" begin="0s" repeatCount="indefinite" />
      </rect>
      <rect x="16" y="16" width="6" height="26" rx="1" fill="currentColor" opacity="0.6">
        <animate attributeName="height" values="26;36;26" dur="1s" begin="0.2s" repeatCount="indefinite" />
        <animate attributeName="y" values="16;6;16" dur="1s" begin="0.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" begin="0.2s" repeatCount="indefinite" />
      </rect>
      <rect x="28" y="22" width="6" height="20" rx="1" fill="currentColor" opacity="0.8">
        <animate attributeName="height" values="20;30;20" dur="1s" begin="0.4s" repeatCount="indefinite" />
        <animate attributeName="y" values="22;12;22" dur="1s" begin="0.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" begin="0.4s" repeatCount="indefinite" />
      </rect>
      <rect x="40" y="30" width="6" height="12" rx="1" fill="currentColor">
        <animate attributeName="height" values="12;20;12" dur="1s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" values="30;22;30" dur="1s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.6;1" dur="1s" begin="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

export default function Loader() {
  const [message, setMessage] = useState(MESSAGES[0]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const delay = 5000 + Math.floor(Math.random() * 5001);
      timeoutId = setTimeout(() => {
        setMessage(randomMessage());
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-foreground">
      <LoaderSVG />
      <p suppressHydrationWarning>{message}</p>
    </div>
  );
}
import { useEffect, useState, useMemo } from 'react';

export default function Loader() {
    const messages = useMemo(
        () => [
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
            ],
        []
    );

    const pickRandomMessage = () =>
        messages[Math.floor(Math.random() * messages.length)];

    const [randomMessage, setRandomMessage] = useState(pickRandomMessage);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const scheduleNext = () => {
            const delay = 5000 + Math.floor(Math.random() * 5001); // 5–10s
            timeoutId = setTimeout(() => {
                setRandomMessage(
                    messages[Math.floor(Math.random() * messages.length)]
                );
                scheduleNext();
            }, delay);
        };

        scheduleNext();

        return () => clearTimeout(timeoutId);
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-[url('/loader.svg')] bg-no-repeat bg-center min-h-20 min-w-[100px]" />  
            <p>{randomMessage}</p>
        </div>
    );
}
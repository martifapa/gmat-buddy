import { useEffect, useRef } from "react";


export default function useAutoResizeTextArea() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;

        if (textarea) {
            const handleInput = () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            };

            textarea.addEventListener('input', handleInput);

            handleInput(); // Initial resize

            return () => { // On unmount
                if (textarea) {
                    textarea.removeEventListener('input', handleInput);
                }
            };
        }
    }, []);
  return textareaRef;
};
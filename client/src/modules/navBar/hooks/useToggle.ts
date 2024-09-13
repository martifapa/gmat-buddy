import React from 'react';


interface ToggleHandlers {
    on: () => void,
    off: () => void,
    toggle: () => void,
}

export default function useToggle(): [boolean, ToggleHandlers] {
    const [state, setState] = React.useState(false);
    const handlers = React.useMemo(
        () => ({
            on: () => setState(true),
            off: () => setState(false),
            toggle: () => setState(!state),
        }),
        [state]
    );
    return [state, handlers];
};
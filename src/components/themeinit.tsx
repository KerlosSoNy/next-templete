'use client';

import { initTheme } from '@/utils/functions/themeUpdate';
import { useEffect } from 'react';

export function ThemeInitializer() {
    useEffect(() => {
        initTheme();
    }, [])

    return null;
}
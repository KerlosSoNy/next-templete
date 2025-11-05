'use client'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import { showToast } from '../redux/slices/toast';
import { useTranslations } from 'next-intl';

const useCopyToClipboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations()
    const copyToClipboard = useCallback((text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                dispatch(showToast(t('success'), t(`toast.text_copied`), 'success'))
            }).catch(() => {
                dispatch(showToast(t('toast.error'), t(`toast.fialed_to_copy`), 'error'))
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                dispatch(showToast(t('success'), t(`toast.text_copied`), 'success'))
            } catch (err) {
                dispatch(showToast(t('toast.error'), t(`toast.fialed_to_copy`), 'error'))
                return err;
            }
            document.body.removeChild(textarea);
        }
    }, []);

    return copyToClipboard;
};

export default useCopyToClipboard;

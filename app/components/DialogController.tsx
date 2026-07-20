'use client';

import { useEffect, useState } from 'react';
import { EnquiryDialog } from './EnquiryDialog';

type EnquiryDetail = { service?: string };

export function DialogController() {
  const [open, setOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>();

  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent<EnquiryDetail>).detail;
      setPresetService(detail?.service);
      setOpen(true);
    }
    window.addEventListener('open-enquiry-dialog', handler);
    return () => window.removeEventListener('open-enquiry-dialog', handler);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('lenis-dialog-lock', { detail: { locked: open } })
    );
  }, [open]);

  return (
    <EnquiryDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setPresetService(undefined);
      }}
      presetService={presetService}
    />
  );
}

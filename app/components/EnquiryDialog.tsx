'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2Icon, CheckIcon, ShieldCheckIcon, ClockIcon, LockIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().min(1, 'Please choose a preferred date'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

interface EnquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presetService?: string;
}

const SERVICES = [
  { value: 'home-cleaning', label: 'Home Cleaning' },
  { value: 'repairs-handyman', label: 'Repairs & Handyman' },
  { value: 'beauty-wellness', label: 'Beauty & Wellness' },
  { value: 'appliance-service', label: 'Appliance Service' },
  { value: 'moving-delivery', label: 'Moving & Delivery' },
  { value: 'gardening-outdoor', label: 'Gardening & Outdoor' },
  { value: 'general-enquiry', label: 'General Enquiry' },
] as const;

const fieldShell =
  'h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary disabled:opacity-50';

export function EnquiryDialog({ open, onOpenChange, presetService }: EnquiryDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      service: '',
      preferredDate: '',
      message: '',
    },
  });

  useEffect(() => {
    if (open && presetService) {
      setValue('service', presetService, { shouldValidate: false });
    }
  }, [open, presetService, setValue]);

  function handleOpenChange(next: boolean) {
    if (!next) {
      setSuccess(false);
      setSubmitting(false);
      reset();
    }
    onOpenChange(next);
  }

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || 'Something went wrong. Please try again.');
        return;
      }

      setSuccess(true);
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-lenis-prevent
        className="flex max-h-[min(92vh,720px)] w-full flex-col gap-0 overflow-hidden rounded-xl border-border p-0 sm:max-w-lg"
      >
        {/* Header — always visible */}
        <div className="shrink-0 border-b border-border px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <DialogHeader className="gap-1.5 pr-8">
            <DialogTitle className="font-display text-xl font-bold text-foreground">
              {success ? 'Enquiry sent' : 'Request a service'}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-pretty">
              {success
                ? 'We will review your request and get back to you soon.'
                : 'Tell us what you need. We will match you with a verified local professional.'}
            </DialogDescription>
          </DialogHeader>

          {!success && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <LockIcon className="size-3 text-primary" aria-hidden />
                Free to enquire
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheckIcon className="size-3 text-primary" aria-hidden />
                Verified professionals
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="size-3 text-primary" aria-hidden />
                Clear quotes before booking
              </span>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-12 sm:px-6"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-accent-soft">
                <CheckIcon className="size-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="m-0 font-display text-lg font-semibold text-foreground">
                  Enquiry sent!
                </p>
                <p className="mt-1.5 m-0 text-sm text-muted-foreground text-pretty">
                  Thanks for reaching out. A verified local pro will follow up with clear next steps.
                </p>
              </div>
              <Button
                type="button"
                size="lg"
                className="mt-2 min-w-40"
                onClick={() => handleOpenChange(false)}
              >
                Done
              </Button>
            </motion.div>
          ) : (
            <form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* Scrollable fields */}
              <div
                data-lenis-prevent
                data-lenis-prevent-wheel
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        Full name <span aria-hidden className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Jane Smith"
                        autoComplete="name"
                        aria-invalid={!!errors.fullName}
                        {...register('fullName')}
                        className={`${fieldShell} ${errors.fullName ? 'border-destructive' : ''}`}
                      />
                      {errors.fullName && (
                        <p role="alert" className="m-0 text-xs text-destructive">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span aria-hidden className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="jane@example.com"
                        aria-invalid={!!errors.email}
                        {...register('email')}
                        className={`${fieldShell} ${errors.email ? 'border-destructive' : ''}`}
                      />
                      {errors.email && (
                        <p role="alert" className="m-0 text-xs text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone <span aria-hidden className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+44 7700 900000"
                        aria-invalid={!!errors.phone}
                        {...register('phone')}
                        className={`${fieldShell} ${errors.phone ? 'border-destructive' : ''}`}
                      />
                      {errors.phone && (
                        <p role="alert" className="m-0 text-xs text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="service-trigger" className="text-sm font-medium">
                        Service <span aria-hidden className="text-destructive">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="service"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger
                              id="service-trigger"
                              className={`h-11 w-full rounded-lg ${errors.service ? 'border-destructive' : ''}`}
                              aria-invalid={!!errors.service}
                            >
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {SERVICES.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.service && (
                        <p role="alert" className="m-0 text-xs text-destructive">
                          {errors.service.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="preferredDate" className="text-sm font-medium">
                      Preferred date <span aria-hidden className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      aria-invalid={!!errors.preferredDate}
                      {...register('preferredDate')}
                      className={`${fieldShell} ${errors.preferredDate ? 'border-destructive' : ''}`}
                    />
                    {errors.preferredDate && (
                      <p role="alert" className="m-0 text-xs text-destructive">
                        {errors.preferredDate.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Tell us more <span aria-hidden className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Describe the job, size, access notes, or any questions…"
                      aria-invalid={!!errors.message}
                      {...register('message')}
                      className={`min-h-[4.5rem] w-full resize-y rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary ${
                        errors.message ? 'border-destructive' : ''
                      }`}
                    />
                    {errors.message && (
                      <p role="alert" className="m-0 text-xs text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit — always pinned at bottom */}
              <div className="shrink-0 border-t border-border bg-popover px-5 py-4 sm:px-6">
                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full"
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin" aria-hidden />
                      Sending enquiry…
                    </>
                  ) : (
                    'Send enquiry'
                  )}
                </Button>
                <p className="mt-2 m-0 text-center text-xs text-muted-foreground">
                  Free to enquire · No payment required
                </p>
              </div>
            </form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

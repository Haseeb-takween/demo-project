import Link from 'next/link';
import { cn } from '@/lib/utils';

type BrandMarkProps = {
  className?: string;
  showWordmark?: boolean;
  interactive?: boolean;
  wordmarkClassName?: string;
};

/** Servio mark — teal tile with brand initial */
export function BrandMark({
  className,
  showWordmark = true,
  interactive = false,
  wordmarkClassName,
}: BrandMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', interactive && 'group', className)}>
      <span
        aria-hidden
        className={cn(
          'flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-display font-bold text-sm tracking-tight shadow-md shadow-primary/25',
          interactive &&
            'transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6'
        )}
      >
        S
      </span>
      {showWordmark && (
        <span
          className={cn(
            'font-display font-semibold text-base tracking-tight text-foreground',
            wordmarkClassName
          )}
        >
          Servio
        </span>
      )}
    </span>
  );
}

type BrandLinkProps = BrandMarkProps & {
  href?: string;
  'aria-label'?: string;
};

export function BrandLink({
  href = '/',
  'aria-label': ariaLabel = 'Servio home',
  ...markProps
}: BrandLinkProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className="inline-flex">
      <BrandMark {...markProps} />
    </Link>
  );
}

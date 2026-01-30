'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
} from 'sonner';
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'success' | 'error' | 'warning';

type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost';
}

interface ToasterProps {
  title?: string;
  message: string;
  variant?: Variant;
  duration?: number;
  position?: Position;
  actions?: ActionButton;
  onDismiss?: () => void;
  highlightTitle?: boolean;
}

export interface ToasterRef {
  show: (props: ToasterProps) => void;
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-card border-border/60 shadow-lg',
  success:
    'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-500/40 shadow-green-500/10',
  error:
    'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-500/40 shadow-red-500/10',
  warning:
    'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-500/40 shadow-amber-500/10',
};

const iconWrapperStyles: Record<Variant, string> = {
  default: 'bg-muted/50',
  success: 'bg-green-500/15 dark:bg-green-400/15',
  error: 'bg-red-500/15 dark:bg-red-400/15',
  warning: 'bg-amber-500/15 dark:bg-amber-400/15',
};

const titleColor: Record<Variant, string> = {
  default: 'text-foreground',
  success: 'text-green-700 dark:text-green-300',
  error: 'text-red-700 dark:text-red-300',
  warning: 'text-amber-700 dark:text-amber-300',
};

const iconColor: Record<Variant, string> = {
  default: 'text-muted-foreground',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-amber-600 dark:text-amber-400',
};

const variantIcons: Record<Variant, React.ComponentType<any>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

const toastAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.95, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2,
    },
  },
};

const iconAnimation = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 20,
      delay: 0.1,
    },
  },
};

const Toaster = forwardRef<ToasterRef, { defaultPosition?: Position }>(
  ({ defaultPosition = 'bottom-right' }, ref) => {
    const toastReference = useRef<string | number | null>(null);

    useImperativeHandle(ref, () => ({
      show({
        title,
        message,
        variant = 'default',
        duration = 4000,
        position = defaultPosition,
        actions,
        onDismiss,
        highlightTitle,
      }) {
        const Icon = variantIcons[variant];

        toastReference.current = sonnerToast.custom(
          (toastId) => (
            <motion.div
              {...toastAnimation}
              className={cn(
                'group relative w-full max-w-md rounded-xl border-2 backdrop-blur-sm shadow-2xl overflow-hidden',
                variantStyles[variant]
              )}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

              <div className="relative flex items-start gap-3 p-4">
                {/* Icon with animated background */}
                <motion.div
                  {...iconAnimation}
                  className={cn(
                    'flex-shrink-0 rounded-lg p-2',
                    iconWrapperStyles[variant]
                  )}
                >
                  <Icon className={cn('h-5 w-5', iconColor[variant])} />
                </motion.div>

                {/* Content */}
                <div className="flex-1 space-y-1 pt-0.5">
                  {title && (
                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className={cn(
                        'font-semibold text-sm leading-tight',
                        highlightTitle && titleColor[variant],
                        !highlightTitle && 'text-foreground'
                      )}
                    >
                      {title}
                    </motion.h3>
                  )}
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {message}
                  </motion.p>

                  {/* Action button */}
                  {actions?.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="pt-2"
                    >
                      <Button
                        size="sm"
                        variant={actions.variant || 'outline'}
                        onClick={() => {
                          actions.onClick();
                          sonnerToast.dismiss(toastId);
                        }}
                        className={cn(
                          'h-8 text-xs font-medium transition-all hover:scale-105 active:scale-95',
                          variant === 'success' &&
                            'text-green-700 dark:text-green-300 border-green-600/50 hover:bg-green-600/10 dark:hover:bg-green-400/20',
                          variant === 'error' &&
                            'text-red-700 dark:text-red-300 border-red-600/50 hover:bg-red-600/10 dark:hover:bg-red-400/20',
                          variant === 'warning' &&
                            'text-amber-700 dark:text-amber-300 border-amber-600/50 hover:bg-amber-600/10 dark:hover:bg-amber-400/20'
                        )}
                      >
                        {actions.label}
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    sonnerToast.dismiss(toastId);
                    onDismiss?.();
                  }}
                  className={cn(
                    'flex-shrink-0 rounded-lg p-1.5 transition-all hover:scale-110 active:scale-95',
                    'hover:bg-black/5 dark:hover:bg-white/10',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    'opacity-60 hover:opacity-100'
                  )}
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Progress bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className={cn(
                  'h-1 origin-left',
                  variant === 'success' && 'bg-green-500/40',
                  variant === 'error' && 'bg-red-500/40',
                  variant === 'warning' && 'bg-amber-500/40',
                  variant === 'default' && 'bg-muted-foreground/30'
                )}
              />
            </motion.div>
          ),
          {
            duration,
            position,
          }
        );
      },
    }));

    return (
      <SonnerToaster
        position={defaultPosition}
        toastOptions={{
          unstyled: true,
          className: 'toast',
        }}
        gap={12}
      />
    );
  }
);

Toaster.displayName = 'Toaster';

export default Toaster;
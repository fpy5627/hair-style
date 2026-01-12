'use client';

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import React from 'react';

interface IntlProviderClientProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

/**
 * IntlProviderClient: Client-side wrapper for next-intl provider
 * This avoids the "Functions cannot be passed directly to Client Components" error
 * by defining non-serializable props (like getMessageFallback) inside a Client Component.
 */
export const IntlProviderClient = ({
  children,
  locale,
  messages,
}: IntlProviderClientProps) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      getMessageFallback={({ key }) => key}
      onError={(error) => {
        // You can log translation errors here if needed
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[intl] Translation error for key "${error}":`, error);
        }
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
};


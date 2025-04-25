// components/LocaleDropdown.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface LocaleDropdownProps {
  className?: string;
}

// Define the localization options
const localeOptions = {
  'en-US': {
    'en-US': 'English',
    'fr-FR': 'French',
    'es-MX': 'Spanish',
    'fil-PH': 'Filipino'
  },
  'fr-FR': {
    'en-US': 'Anglais',
    'fr-FR': 'Français',
    'es-MX': 'Espagnol',
    'fil-PH': 'Philippine'
  },
  'es-MX': {
    'en-US': 'Inglés',
    'fr-FR': 'Francés',
    'es-MX': 'Español',
    'fil-PH': 'Filipino'
  },
  'fil-PH': {
    'en-US': 'Ingles',
    'fr-FR': 'Pranses',
    'es-MX': 'Espanyol',
    'fil-PH': 'Filipino'
  }
} as const;

// Type for valid locale codes
type LocaleCode = keyof typeof localeOptions;

export function LocaleDropdown({
  className,
}: LocaleDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Define valid options as a Set
  const validOptionSet = new Set(Object.keys(localeOptions));

  // Safely get current locale
  const getCurrentLocale = (): LocaleCode => {
    const paramLocale = searchParams.get('activeLocale');
    return validOptionSet.has(paramLocale || '') 
      ? (paramLocale as LocaleCode) 
      : 'en-US';
  };

  // Get localized name based on current locale
  const getLocalizedName = (locale: LocaleCode) => {
    const currentLocale = getCurrentLocale();
    return localeOptions[currentLocale][locale];
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLoc = e.target.value as LocaleCode;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('activeLocale', newLoc);
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    router.replace(newUrl);
  };

  return (
    <select
      className={className}
      value={getCurrentLocale()}
      onChange={handleChange}
    >
      {(Object.keys(localeOptions) as LocaleCode[]).map(locale => (
        <option key={locale} value={locale}>
          {getLocalizedName(locale)}
        </option>
      ))}
    </select>
  );
}

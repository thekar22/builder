// components/LocaleDropdown.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface LocaleDropdownProps {
  className?: string;
}

export function LocaleDropdown({
  className,
}: LocaleDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Define valid options as a Set
  const validOptionSet = new Set(['en-US', 'fil-PH', 'fr-FR', 'es-MX']);

  // Safely get current locale
  const getCurrentLocale = () => {
    const paramLocale = searchParams.get('activeLocale');
    // Only use the param value if it's in our valid set
    return validOptionSet.has(paramLocale || '') ? paramLocale : 'en-US';
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLoc = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('activeLocale', newLoc);
    // Create the new URL with updated query parameters
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    // Update the URL with the new query parameter
    router.replace(newUrl);
  };

  return (
    <select
      className={className}
      value={getCurrentLocale() || 'en-US'}
      onChange={handleChange}
    >
      <option value="en-US">English</option>
      <option value="fr-FR">French</option>
      <option value="es-MX">Spanish</option>
      <option value="fil-PH">Filipino</option>
    </select>
  );
}

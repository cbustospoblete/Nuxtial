
// Typography options based on our design system
export type SerifFont = 'Playfair Display' | 'Cormorant Garamond' | 'Cinzel' | 'Bodoni Moda' | 'Lora' | 'Cardo';
export type SansFont = 'Montserrat' | 'Raleway' | 'Lato' | 'Inter' | 'Quicksand' | 'Tenor Sans';
export type ScriptFont = 'Great Vibes' | 'Pinyon Script' | 'Dancing Script' | 'Alex Brush' | 'Amsterdam' | 'Parisienne';

export type FontConfig = {
  heading: SerifFont | SansFont;
  body: SansFont | SerifFont;
  accent: ScriptFont;
};

export type ColorPalette = {
  primary: string;   // Main brand color (buttons, highlights)
  secondary: string; // Secondary elements
  background: string; // Page background
  surface: string;   // Cards or sections background
  text: string;      // Body text
  heading: string;   // Headings text
  accent: string;    // Special details
};

export type ThemeConfig = {
  id: string;
  name: string;
  colors: ColorPalette;
  fonts: FontConfig;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadows: 'none' | 'soft' | 'hard';
  layout: 'centered' | 'split' | 'fullscreen';
};

// Content Interfaces

export interface CoupleMember {
  firstName: string;
  lastName: string;
  role: 'Groom' | 'Bride' | 'Partner'; // Extensible
  photoUrl?: string;
  bio?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
  };
}

export interface EventLocation {
  name: string;
  address: string;
  city: string;
  country: string;
  googleMapsUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export interface EventDetails {
  date: string; // ISO Date
  time: string; // HH:mm
  timezone: string;
  ceremony: EventLocation;
  reception?: EventLocation;
}

export interface SectionBase {
  id: string;
  type: 'hero' | 'story' | 'gallery' | 'event-details' | 'rsvp' | 'gift-registry' | 'countdown' | 'custom';
  isEnabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
}

// Section specific data types
export interface HeroSection extends SectionBase {
  type: 'hero';
  data: {
    layout: 'full-image' | 'text-overlay' | 'split';
    backgroundImageUrl?: string;
    headline?: string; // Usually "Save the Date" or names
    subheadline?: string;
  };
}

export interface StorySection extends SectionBase {
  type: 'story';
  data: {
    text: string;
    imageUrl?: string;
    timeline?: Array<{ year: string; title: string; description: string }>;
  };
}

export interface GallerySection extends SectionBase {
  type: 'gallery';
  data: {
    layout: 'grid' | 'masonry' | 'carousel';
    images: Array<{ url: string; caption?: string }>;
  };
}

// Union type for all sections
export type InvitationSection = HeroSection | StorySection | GallerySection | SectionBase;

// MAIN INVITATION INTERFACE
export interface Invitation {
  id: string;
  slug: string; // URL friendly (e.g. ana-y-luis)
  status: 'draft' | 'published' | 'archived';
  meta: {
    title: string; // SEO Title
    description: string; // SEO Description
    ogImage?: string; // Social share image
  };
  theme: ThemeConfig;
  content: {
    couple: [CoupleMember, CoupleMember];
    event: EventDetails;
  };
  sections: InvitationSection[];
  createdAt: string;
  updatedAt: string;
}

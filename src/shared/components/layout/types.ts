export type AppViewer = {
  balance: string;
};

export type HomeSidebarSliderItem = {
  id: string;
  label: string;
  iconUrl: string | null;
  href: string;
};

export type HomeSidebarFeaturedSlider = {
  imageUrl: string | null;
  href: string;
  alt: string;
};

export type HomeSidebarSliderContent = {
  featured: HomeSidebarFeaturedSlider | null;
  items: HomeSidebarSliderItem[];
};

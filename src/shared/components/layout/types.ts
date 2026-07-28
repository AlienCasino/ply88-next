export type AppViewer = {
  balance: string;
};

export type HomeSidebarSliderItem = {
  id: string;
  label: string;
  iconUrl: string | null;
  href: string;
};

export type HomeSidebarSliderContent = {
  items: HomeSidebarSliderItem[];
};

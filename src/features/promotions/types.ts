export type PromotionCategory = "" | "casino" | "sport" | "specials";

export type PromotionRule = {
  title: string;
  content: string;
};

export type PromotionSection = {
  id: string;
  title: string;
  content: string;
  order: number;
};

export type PromotionCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  imageUrl: string | null;
  ctaText: string;
  publishedAt: string | null;
};

export type PromotionDetail = PromotionCard & {
  status: string;
  termsVersion: string;
  rules: PromotionRule[];
  sections: PromotionSection[];
  updatedAt: string | null;
};

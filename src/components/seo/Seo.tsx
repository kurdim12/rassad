import { Helmet } from "react-helmet-async";

const SITE_URL = "https://rassad.lovable.app";
const DEFAULT_OG = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3a7d7304-74d8-4b60-9f61-0faa91665342/id-preview-1c268a57--bfaf2990-9d34-42e1-9056-41383528b9c4.lovable.app-1777875557245.png";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

export const Seo = ({
  title,
  description,
  path = "/",
  image = DEFAULT_OG,
  type = "website",
  noindex = false,
}: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes("رصد") ? title : `${title} | رصد`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="ar-JO" href={url} />
      <link rel="alternate" hrefLang="ar" href={url} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ar_JO" />
      <meta property="og:site_name" content="رصد RASAD" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

import React, { FC, memo } from "react";
import { Helmet } from "react-helmet";

export type Props = {
  title: string;
  description: string;
  image?: string;
};

const cutTags = (text = "") => {
  return text.replace(/<\/?.+?>/gi, "");
};

const prepareData = (title: string, description: string, image?: string) => {
  return {
    title: cutTags(title),
    description: cutTags(description).substr(0, 250),
    image,
  };
};

const PageMeta: FC<Props> = ({ title, description, image }: Props) => {
  const data = prepareData(title, description, image);
  return (
    <Helmet>
      <title>{data.title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

const WrappedPageMeta = memo(PageMeta);
export { WrappedPageMeta as PageMeta };

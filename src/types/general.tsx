export type SearchParams = { [key: string]: string };

export type NextPageProps = {
  params: { slug: string };
  searchParams: SearchParams;
};

export type CardInfoType = {
  imagePath: string;
  content: string;
  linkTo: string;
  linkText?: string;
};

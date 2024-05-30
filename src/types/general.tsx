export type SearchParams = { [key: string]: string };

export type NextPageProps = {
  params: { slug: string };
  searchParams: SearchParams;
};

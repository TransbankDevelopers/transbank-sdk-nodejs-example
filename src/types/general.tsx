export type SearchParams = { [key: string]: string | string[] | undefined };

export type NextPageProps = {
  params: { slug: string };
  searchParams: SearchParams;
};

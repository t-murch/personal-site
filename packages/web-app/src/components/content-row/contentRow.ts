export interface ContentRowProps {
  additional?: string;
  imageLink?: string;
  linkTo?: boolean;
  secondaryInfo: string;
  title: string;
  url: string;
  data?: { [key: string]: string | number | boolean };
}

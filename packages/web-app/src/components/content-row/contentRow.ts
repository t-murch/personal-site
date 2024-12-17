export interface ContentRowProps {
  additional?: string;
  imageLink?: string;
  linkTo?: boolean;
  priorityLoad?: boolean;
  secondaryInfo: string;
  title: string;
  url: string;
  data?: { [key: string]: string | number | boolean };
}

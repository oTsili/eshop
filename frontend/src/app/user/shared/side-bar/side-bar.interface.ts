interface Accordion {
  header: string;
  component: any;
}

export interface SideBar {
  header: string;
  accordions: Accordion[];
}

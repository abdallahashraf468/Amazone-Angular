import { InavbarData } from "./helper";

export const navbarData: InavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    routeLink: 'products',
    icon: 'fal fa-box-open',
    label: 'Products',
    items: [
      {
        routeLink: 'products/level1.1',
        label: 'Level 1.1',
        expanded: false,
        // items: [
        //   {
        //     routeLink: 'products/level2.1',
        //     label: 'Level 2.1',
        //     expanded: false,
        //   },
        //   {
        //     routeLink: 'products/level2.2',
        //     label: 'Level 2.2',
        //     expanded: false,
        //     items: [
        //       {
        //         routeLink: 'products/level3.1',
        //         label: 'Level 3.1',
        //         expanded: false,
        //       },
        //       {
        //         routeLink: 'products/level3.2',
        //         label: 'Level 3.2',
        //         expanded: false,
        //       }
        //     ]
        //   }
        // ],
      },
      {
        routeLink: 'products/level1.2',
        label: 'Level 1.2',
      },
    ]
  },
  {
    routeLink: 'statistics',
    icon: 'fal fa-chart-bar',
    label: 'Statistics',
  },
  {
    routeLink: 'coupens',
    icon: 'fal fa-tags',
    label: 'Coupens',
    items: [
      {
        routeLink: 'coupens/list',
        label: 'List Coupens',
      },
      {
        routeLink: 'coupens/create',
        label: 'Create Coupens',
      }
    ],
    expanded: false,
  },
  {
    routeLink: 'media',
    icon: 'fal fa-camera',
    label: 'Media',
  },
  {
    routeLink: 'settings',
    icon: 'fal fa-cog',
    label: 'Settings',
  },
]

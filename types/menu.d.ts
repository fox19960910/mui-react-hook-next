type PermissionMenuKeys =
  | 'dashboard'
  | 'issueList'
  | 'deliveryList'
  | 'completeList'
  | 'riderList'
  | 'manage'
  | 'stacking'
  | 'reason'
  | 'distance'
  | 'monitoring'
  | 'orderDetail'
  | 'whatsupyo';

interface PermissionMenuList {
  [k: PermissionMenuKeys | string]: {
    label: string;
    path: string;
    icon?: import('@const/MenuIcons').IconType;
    permission?: boolean;
    sub?: PermissionMenuList;
    disabled?: boolean;
  };
}

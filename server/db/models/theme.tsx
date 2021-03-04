export interface SiteTheme {
  id?: number;
  theme?: string;
  description?: string;
  deleted?: boolean;
}

export interface UserTheme {
  id?: number;
  themeId?: number;
  device?: string;
  user_id?: string;
}

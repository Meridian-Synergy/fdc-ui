// Descripteur de colonne pour FdcDataTable. `key` = clé lue dans la ligne
// (et nom du slot de cellule `cell-<key>`). Le DS reste i18n-agnostique :
// `label` est fourni déjà traduit par le consommateur.
export interface FdcColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  /** largeur CSS optionnelle (ex. '1px' pour une colonne d'actions serrée). */
  width?: string
}

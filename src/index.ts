// Point d'entrée du DS FDC. Les consommateurs importent depuis 'fdc-ui'.
// Le DS est consommé en dépendance git (github:Meridian-Synergy/fdc-ui) et
// transpilé par le consommateur (pas de build/publish npm).
export { default as FdcButton } from './components/FdcButton/FdcButton.vue'

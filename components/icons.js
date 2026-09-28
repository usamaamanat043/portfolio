const paths = {
  agent: (<><rect x="5" y="10" width="22" height="16" rx="4" /><circle cx="12" cy="18" r="1.6" /><circle cx="20" cy="18" r="1.6" /><path d="M16 10V6M13 6h6M2 17h3M27 17h3M13 22h6" /></>),
  chat: (<><path d="M5 6h22a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H14l-6 5v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" /><circle cx="10.5" cy="14.5" r="1.2" /><circle cx="16" cy="14.5" r="1.2" /><circle cx="21.5" cy="14.5" r="1.2" /></>),
  app: (<><rect x="3" y="5" width="26" height="22" rx="3" /><path d="M3 11h26M12 16l-3 3 3 3M20 16l3 3-3 3" /></>),
};
export default function ServiceIcon({ name }) {
  return <svg viewBox="0 0 32 32" aria-hidden="true">{paths[name]}</svg>;
}

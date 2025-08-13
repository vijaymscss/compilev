// minimal cva-compatible helper for shadcn-like variants without TS
export function cva(base, config = {}) {
  return (props = {}) => {
    const classes = [base];
    const { variants = {}, defaultVariants = {} } = config;
    const all = { ...defaultVariants, ...props };
    for (const variantName of Object.keys(variants)) {
      const variantValue = all[variantName];
      const map = variants[variantName];
      if (variantValue && map[variantValue]) classes.push(map[variantValue]);
    }
    if (props.className) classes.push(props.className);
    return classes.filter(Boolean).join(" ");
  };
}

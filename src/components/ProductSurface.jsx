export function AuroraBackground() {
  return (
    <div className="aurora-background" aria-hidden="true">
      <div className="aurora-grid" />
      <div className="aurora-band aurora-band-one" />
      <div className="aurora-band aurora-band-two" />
      <div className="aurora-band aurora-band-three" />
      <div className="aurora-noise" />
    </div>
  );
}

export function GlassCard({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component className={`glass-card ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

export function GradientText({ as: Component = "span", className = "", children, ...props }) {
  return (
    <Component className={`gradient-text ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

export function InteractiveButton({
  as: Component = "button",
  className = "",
  children,
  icon: Icon,
  variant = "primary",
  ...props
}) {
  return (
    <Component className={`interactive-button ${variant} ${className}`.trim()} {...props}>
      {Icon ? <Icon size={16} aria-hidden="true" /> : null}
      {children}
    </Component>
  );
}

export function RevealSection({ as: Component = "section", className = "", children, ...props }) {
  return (
    <Component className={`reveal-section ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

export function LocalStatusBadge({ children, tone = "neutral" }) {
  return <span className={`local-status-badge ${tone}`}>{children}</span>;
}

export function DashboardMetricCard({ icon: Icon, label, value, helper, tone = "teal" }) {
  return (
    <GlassCard className={`dashboard-metric-card tone-${tone}`}>
      <div className="dashboard-metric-icon">
        {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {helper ? <small>{helper}</small> : null}
      </div>
    </GlassCard>
  );
}

export function ToastStack({ items = [] }) {
  return (
    <div className="toast-stack" role="status" aria-live="polite" aria-atomic="false">
      {items.map((item) => (
        <div className={`toast ${item.tone ?? "success"}`} key={item.id}>
          {item.message}
        </div>
      ))}
    </div>
  );
}


import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronDown,
  CircleHelp,
  Clock3,
  Gauge,
  LayoutDashboard,
  MapPin,
  Menu,
  Search,
  Settings,
  Truck,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useState } from 'react'
import './App.css'

const telemetry = [
  { time: '08:00', speed: 42, fuel: 78 },
  { time: '09:00', speed: 55, fuel: 75 },
  { time: '10:00', speed: 48, fuel: 73 },
  { time: '11:00', speed: 68, fuel: 70 },
  { time: '12:00', speed: 61, fuel: 67 },
  { time: '13:00', speed: 74, fuel: 64 },
  { time: '14:00', speed: 57, fuel: 61 },
  { time: '15:00', speed: 65, fuel: 58 },
]

const initialVehicles = [
  { id: 'TRK-2048', driver: 'James Wilson', route: 'Mumbai → Pune', speed: 68, fuel: 78, status: 'Moving', color: 'blue' },
  { id: 'TRK-1932', driver: 'Sophia Chen', route: 'Pune → Nashik', speed: 54, fuel: 62, status: 'Moving', color: 'purple' },
  { id: 'VAN-0871', driver: 'Liam Patel', route: 'Mumbai Central', speed: 0, fuel: 91, status: 'Idle', color: 'orange' },
  { id: 'TRK-2156', driver: 'Olivia Brown', route: 'Thane → Mumbai', speed: 72, fuel: 34, status: 'Alert', color: 'red' },
  { id: 'VAN-0643', driver: 'Noah Sharma', route: 'Pimpri → Chakan', speed: 41, fuel: 83, status: 'Moving', color: 'green' },
]

const initialAlerts = [
  { id: 1, title: 'Low fuel detected', detail: 'TRK-2156 · Fuel level at 34%', time: '4 min ago', type: 'warning' },
  { id: 2, title: 'Vehicle back online', detail: 'VAN-0643 · Signal restored', time: '18 min ago', type: 'success' },
  { id: 3, title: 'Scheduled maintenance', detail: 'TRK-1932 · Service due soon', time: '32 min ago', type: 'info' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Vehicles', icon: Truck },
  { label: 'Live tracking', icon: MapPin },
  { label: 'Analytics', icon: Activity },
  { label: 'Alerts', icon: Bell },
]

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All vehicles')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [lastUpdated, setLastUpdated] = useState('Just now')

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = `${vehicle.id} ${vehicle.driver} ${vehicle.route}`
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === 'All vehicles' || vehicle.status === statusFilter
    return matchesSearch && matchesStatus
  })

  function refreshDashboard() {
    setVehicles((current) =>
      current.map((vehicle) =>
        vehicle.status === 'Moving'
          ? {
              ...vehicle,
              speed: Math.max(20, Math.min(90, vehicle.speed + Math.round(Math.random() * 10 - 5))),
            }
          : vehicle,
      ),
    )
    setLastUpdated('Just now')
  }

  return (
    <div className="app-shell">
      {mobileNavOpen && (
        <button
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Activity size={22} /></div>
          <div className="brand-copy">
            <span className="brand-name">Fleet<span>Dash</span></span>
            <span className="brand-caption">FLEET INTELLIGENCE</span>
          </div>
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <button className="workspace-switcher">
          <span className="workspace-avatar">FO</span>
          <span className="workspace-text"><strong>Fleet Operations</strong><small>Enterprise plan</small></span>
          <ChevronDown size={16} />
        </button>

        <div className="nav-heading">MAIN MENU</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activeNav === label ? 'nav-item-active' : ''}`}
              onClick={() => {
                setActiveNav(label)
                setMobileNavOpen(false)
              }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === 'Alerts' && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="online-dot" />
            <div><strong>System operational</strong><small>All services available</small></div>
          </div>
          <button className="nav-item" onClick={() => setActiveNav('Settings')}>
            <Settings size={18} /><span>Settings</span>
          </button>
          <button className="nav-item" onClick={() => setActiveNav('Help & support')}>
            <CircleHelp size={18} /><span>Help & support</span>
          </button>
          <div className="profile">
            <div className="profile-avatar">AJ</div>
            <div className="profile-copy"><strong>Admin User</strong><small>Fleet administrator</small></div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileNavOpen(true)}>
              <Menu size={21} />
            </button>
            <div className="breadcrumb">Workspace <span>/</span> <strong>{activeNav}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="connection-pill"><span className="online-dot" /> Demo data</div>
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={19} /><span className="notification-dot" />
            </button>
            <div className="topbar-divider" />
            <div className="topbar-date"><span>THURSDAY, OCTOBER 16</span><strong>Fleet overview</strong></div>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> FLEET OPERATIONS CENTER</div>
              <h1>{activeNav === 'Overview' ? 'Fleet overview' : activeNav}</h1>
              <p>Monitor your fleet performance and stay ahead of every journey.</p>
            </div>
            <div className="heading-actions">
              <span className="updated-label"><Clock3 size={14} /> Updated {lastUpdated}</span>
              <button className="primary-button" onClick={refreshDashboard}><Activity size={16} /> Refresh data</button>
            </div>
          </section>

          <section className="welcome-banner">
            <div className="banner-orb orb-one" /><div className="banner-orb orb-two" />
            <div className="banner-content">
              <div className="banner-tag"><Zap size={13} /> FLEET INTELLIGENCE</div>
              <h2>Your fleet, <span>in motion.</span></h2>
              <p>A unified view of your vehicles, routes, and operational health.</p>
              <button className="banner-button" onClick={() => setActiveNav('Live tracking')}>Explore live tracking <span>→</span></button>
            </div>
            <div className="banner-graphic" aria-hidden="true">
              <div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" />
              <div className="radar-center"><Truck size={35} /></div>
              <div className="radar-point point-one" /><div className="radar-point point-two" /><div className="radar-point point-three" />
              <span className="radar-label label-one">LIVE TELEMETRY</span><span className="radar-label label-two">GPS ACTIVE</span>
            </div>
          </section>

          <section className="section-heading">
            <div><h2>Operational snapshot</h2><p>Your fleet at a glance</p></div>
            <div className="live-indicator"><span className="pulse-dot" /> DEMO OVERVIEW</div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-top"><span>Total vehicles</span><span className="stat-icon icon-blue"><Truck size={18} /></span></div>
              <div className="stat-value">248 <span className="stat-unit">vehicles</span></div>
              <div className="stat-foot"><span className="trend-positive">↑ 12.5%</span><span>vs. last month</span><span className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Currently moving</span><span className="stat-icon icon-green"><Activity size={18} /></span></div>
              <div className="stat-value">186 <span className="stat-unit">vehicles</span></div>
              <div className="stat-foot"><span className="trend-positive">75%</span><span>of total fleet</span><span className="mini-bars green-bars"><i /><i /><i /><i /><i /><i /><i /></span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Idle vehicles</span><span className="stat-icon icon-orange"><Clock3 size={18} /></span></div>
              <div className="stat-value">42 <span className="stat-unit">vehicles</span></div>
              <div className="stat-foot"><span className="trend-neutral">16.9%</span><span>of total fleet</span><span className="mini-bars orange-bars"><i /><i /><i /><i /><i /><i /><i /></span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Active alerts</span><span className="stat-icon icon-red"><AlertTriangle size={18} /></span></div>
              <div className="stat-value">08 <span className="stat-unit">alerts</span></div>
              <div className="stat-foot"><span className="trend-negative">3 high priority</span><span className="mini-bars red-bars"><i /><i /><i /><i /><i /><i /><i /></span></div>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel telemetry-panel">
              <div className="panel-heading">
                <div><h3>Fleet telemetry</h3><p>Average vehicle speed over time</p></div>
                <button className="select-button">Today <ChevronDown size={14} /></button>
              </div>
              <div className="chart-legend"><span><i className="legend-blue" /> Average speed <strong>58 km/h</strong></span><span><i className="legend-muted" /> Previous period</span></div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetry} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
                    <defs><linearGradient id="speedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5685ff" stopOpacity={0.25} /><stop offset="95%" stopColor="#5685ff" stopOpacity={0.01} /></linearGradient></defs>
                    <CartesianGrid stroke="#202b3a" strokeDasharray="3 5" vertical={false} />
                    <XAxis dataKey="time" tick={{ fill: '#7e8ca3', fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fill: '#7e8ca3', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#121c2a', border: '1px solid #2a394e', borderRadius: 10, color: '#edf3ff' }} />
                    <Area type="monotone" dataKey="speed" name="Speed (km/h)" stroke="#6390ff" strokeWidth={2.5} fill="url(#speedFill)" activeDot={{ r: 5, fill: '#6390ff', stroke: '#121c2a', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-footer"><span><Wifi size={14} /> Sample telemetry · illustrative data</span><span>Speed in km/h</span></div>
            </article>

            <article className="panel alerts-panel">
              <div className="panel-heading"><div><h3>Recent alerts</h3><p>Events that need your attention</p></div><button className="text-button" onClick={() => setActiveNav('Alerts')}>View all <span>→</span></button></div>
              <div className="alert-list">
                {initialAlerts.map((alert) => (
                  <div className="alert-row" key={alert.id}>
                    <div className={`alert-symbol alert-${alert.type}`}>{alert.type === 'warning' ? <AlertTriangle size={17} /> : alert.type === 'success' ? <Wifi size={17} /> : <Settings size={17} />}</div>
                    <div className="alert-copy"><strong>{alert.title}</strong><p>{alert.detail}</p><span>{alert.time}</span></div>
                    <span className={`alert-severity severity-${alert.type}`}>{alert.type === 'warning' ? 'High' : alert.type === 'success' ? 'Info' : 'Medium'}</span>
                  </div>
                ))}
              </div>
              <div className="alert-footer"><span className="alert-footer-dot" /> Alert feed uses sample data</div>
            </article>
          </section>

          <section className="panel vehicles-panel">
            <div className="panel-heading vehicle-heading">
              <div><h3>Vehicle overview</h3><p>Monitor status and telemetry for individual vehicles</p></div>
              <div className="vehicle-actions">
                <label className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search vehicles..." aria-label="Search vehicles" /></label>
                <select className="filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by vehicle status">
                  <option>All vehicles</option><option>Moving</option><option>Idle</option><option>Alert</option>
                </select>
              </div>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>VEHICLE</th><th>DRIVER</th><th>CURRENT ROUTE</th><th>SPEED</th><th>FUEL LEVEL</th><th>STATUS</th><th /></tr></thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td><div className="vehicle-cell"><span className={`vehicle-avatar vehicle-${vehicle.color}`}><Truck size={17} /></span><strong>{vehicle.id}</strong></div></td>
                      <td>{vehicle.driver}</td><td className="route-cell"><MapPin size={13} /> {vehicle.route}</td>
                      <td><strong>{vehicle.speed}</strong> <span className="muted-cell">km/h</span></td>
                      <td><div className="fuel-cell"><div className="fuel-track"><span className={vehicle.fuel < 40 ? 'fuel-low' : ''} style={{ width: `${vehicle.fuel}%` }} /></div><span>{vehicle.fuel}%</span></div></td>
                      <td><span className={`status-badge status-${vehicle.status.toLowerCase()}`}><i />{vehicle.status}</span></td>
                      <td><button className="row-menu" aria-label={`More actions for ${vehicle.id}`}><span>···</span></button></td>
                    </tr>
                  ))}
                  {filteredVehicles.length === 0 && <tr><td colSpan="7" className="empty-state">No vehicles match your search.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Showing <strong>{filteredVehicles.length}</strong> of <strong>{vehicles.length}</strong> sample vehicles</span><button className="text-button" onClick={() => setActiveNav('Vehicles')}>View vehicle directory <span>→</span></button></div>
          </section>

          <footer className="page-footer"><span>© 2026 FleetDash <span className="footer-separator">·</span> Fleet intelligence platform</span><span><span className="online-dot" /> All systems operational <span className="footer-separator">·</span> Demo environment</span></footer>
        </div>
      </main>
    </div>
  )
}

export default App

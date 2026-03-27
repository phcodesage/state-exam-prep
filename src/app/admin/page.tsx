'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  FileText,
  Image,
  ChevronDown,
  ChevronRight,
  LogOut,
  Save,
  Film,
  RefreshCw,
} from 'lucide-react'

interface MediaFile {
  name: string
  url: string
  type: 'image' | 'video'
  ext: string
  size: number
  updatedAt: string
}

interface SiteContent {
  hero?: { heading: string; subheading: string; ctaText: string }
  about?: { heading: string; body: string }
  contact?: { email: string; phone: string; address: string }
  footer?: { copyright: string }
}

type Tab = 'analytics' | 'content' | 'media'

interface AnalyticsData {
  totalVisits: number
  thisMonth: number
  devices: { label: string; key: string; count: number; pct: number }[]
  topPages: { path: string; label: string; visits: number }[]
}

const DEVICE_META: Record<string, { icon: any; color: string }> = {
  desktop: { icon: Monitor, color: '#0e1f3e' },
  mobile: { icon: Smartphone, color: '#ca3433' },
  tablet: { icon: Tablet, color: '#f59e0b' },
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('analytics')
  const [cmsOpen, setCmsOpen] = useState(true)
  const [media, setMedia] = useState<MediaFile[]>([])
  const [content, setContent] = useState<SiteContent>({})
  const [loadingMedia, setLoadingMedia] = useState(false)
  const [loadingContent, setLoadingContent] = useState(false)
  const [savingContent, setSavingContent] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)

  useEffect(() => {
    if (activeTab === 'analytics') fetchAnalytics()
    if (activeTab === 'media') fetchMedia()
    if (activeTab === 'content') fetchContent()
  }, [activeTab])

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true)
    try {
      const res = await fetch('/api/analytics')
      if (res.ok) setAnalytics(await res.json())
    } catch { /* silent */ } finally { setLoadingAnalytics(false) }
  }

  const fetchMedia = async () => {
    setLoadingMedia(true)
    try {
      const res = await fetch('/api/media')
      if (res.ok) setMedia(await res.json())
    } catch { /* silent */ } finally { setLoadingMedia(false) }
  }

  const fetchContent = async () => {
    setLoadingContent(true)
    try {
      const res = await fetch('/api/content')
      if (res.ok) setContent(await res.json())
    } catch { /* silent */ } finally { setLoadingContent(false) }
  }

  const saveContent = async () => {
    setSavingContent(true)
    setSaveMsg('')
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      setSaveMsg(res.ok ? 'Saved!' : 'Save failed.')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch {
      setSaveMsg('Save failed.')
    } finally {
      setSavingContent(false)
    }
  }

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' }).catch(() => {})
    window.location.href = '/login'
  }

  const setField = (section: keyof SiteContent, key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...(prev[section] as any), [key]: value },
    }))
  }

  /* ──────────────── SIDEBAR ──────────────── */
  const sidebarNav = (
    <aside className="w-64 bg-[#0e1f3e] text-white flex flex-col fixed h-full z-40">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Admin Panel</p>
        <p className="text-lg font-bold leading-tight">Exceed Learning</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
        <NavBtn
          icon={<BarChart3 className="w-5 h-5" />}
          label="Analytics"
          active={activeTab === 'analytics'}
          onClick={() => setActiveTab('analytics')}
        />

        {/* CMS Group */}
        <div>
          <button
            onClick={() => setCmsOpen(o => !o)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            <Globe className="w-5 h-5" />
            <span className="flex-1 text-left">CMS</span>
            {cmsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {cmsOpen && (
            <div className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-3">
              <NavBtn
                icon={<FileText className="w-4 h-4" />}
                label="Content"
                active={activeTab === 'content'}
                onClick={() => setActiveTab('content')}
                small
              />
              <NavBtn
                icon={<Image className="w-4 h-4" />}
                label="Media"
                active={activeTab === 'media'}
                onClick={() => setActiveTab('media')}
                small
              />
            </div>
          )}
        </div>
      </nav>

      {/* Logout at bottom */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-[#ca3433] transition-colors text-sm font-semibold text-white/80 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )

  /* ──────────────── ANALYTICS ──────────────── */
  const monthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  const total = analytics?.totalVisits || 0

  const analyticsView = loadingAnalytics ? (
    <div className="text-center py-20 text-gray-400">Loading analytics…</div>
  ) : !analytics ? (
    <div className="text-center py-20 text-gray-400">No analytics data available. Visit the site to start tracking.</div>
  ) : (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Visits', value: total.toLocaleString(), sub: 'All time', color: 'bg-[#0e1f3e]' },
          { label: 'This Month', value: (analytics.thisMonth || 0).toLocaleString(), sub: monthName, color: 'bg-[#ca3433]' },
        ].map(card => (
          <div key={card.label} className={`${card.color} rounded-xl p-5 text-white`}>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-75">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
            <p className="text-xs opacity-60 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Device breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-[#0e1f3e] mb-4">Visits by Device Type</h3>
        {analytics.devices.length === 0 ? (
          <p className="text-gray-400 text-sm">No device data yet.</p>
        ) : (
          <div className="space-y-4">
            {analytics.devices.map(d => {
              const meta = DEVICE_META[d.key] || { icon: Monitor, color: '#6b7280' }
              const Icon = meta.icon
              return (
                <div key={d.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Icon className="w-4 h-4" style={{ color: meta.color }} />
                      {d.label}
                    </span>
                    <span className="text-sm text-gray-500">{d.count.toLocaleString()} ({d.pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-700"
                      style={{ width: `${d.pct}%`, backgroundColor: meta.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Top pages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-[#0e1f3e] mb-4">Top Pages</h3>
        {analytics.topPages.length === 0 ? (
          <p className="text-gray-400 text-sm">No page data yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 font-semibold text-gray-500">Page</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-500">Visits</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-500">Share</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topPages.map(p => (
                <tr key={p.path} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 px-3 text-gray-700">{p.label} <span className="text-gray-400">{p.path}</span></td>
                  <td className="py-2.5 px-3 text-right font-semibold text-[#0e1f3e]">{p.visits.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-gray-500">{total > 0 ? ((p.visits / total) * 100).toFixed(1) : '0.0'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={fetchAnalytics} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>
    </div>
  )

  /* ──────────────── CONTENT EDITOR ──────────────── */
  const contentView = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0e1f3e]">Content Editor</h2>
        <button
          onClick={saveContent}
          disabled={savingContent}
          className="flex items-center gap-2 bg-[#ca3433] text-white px-5 py-2 rounded-lg hover:bg-[#b32f2e] font-semibold disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {savingContent ? 'Saving…' : 'Save All'}
          {saveMsg && <span className="ml-2 text-xs">{saveMsg}</span>}
        </button>
      </div>

      {loadingContent ? (
        <div className="text-center py-20 text-gray-400">Loading content…</div>
      ) : (
        <>
          {/* Hero */}
          <Section title="Hero Section">
            <Field label="Heading" value={content.hero?.heading || ''} onChange={v => setField('hero', 'heading', v)} />
            <Field label="Subheading" value={content.hero?.subheading || ''} onChange={v => setField('hero', 'subheading', v)} textarea />
            <Field label="CTA Button Text" value={content.hero?.ctaText || ''} onChange={v => setField('hero', 'ctaText', v)} />
          </Section>

          {/* About */}
          <Section title="About Section">
            <Field label="Heading" value={content.about?.heading || ''} onChange={v => setField('about', 'heading', v)} />
            <Field label="Body Text" value={content.about?.body || ''} onChange={v => setField('about', 'body', v)} textarea />
          </Section>

          {/* Contact */}
          <Section title="Contact Info">
            <Field label="Email" value={content.contact?.email || ''} onChange={v => setField('contact', 'email', v)} />
            <Field label="Phone" value={content.contact?.phone || ''} onChange={v => setField('contact', 'phone', v)} />
            <Field label="Address" value={content.contact?.address || ''} onChange={v => setField('contact', 'address', v)} />
          </Section>

          {/* Footer */}
          <Section title="Footer">
            <Field label="Copyright Text" value={content.footer?.copyright || ''} onChange={v => setField('footer', 'copyright', v)} />
          </Section>
        </>
      )}
    </div>
  )

  /* ──────────────── MEDIA ──────────────── */
  const mediaView = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0e1f3e]">Media Library</h2>
        <div className="flex gap-2">
          <button onClick={fetchMedia} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {loadingMedia ? (
        <div className="text-center py-20 text-gray-400">Loading media…</div>
      ) : media.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No media files found in /public/images</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map(file => (
            <button
              key={file.name}
              onClick={() => setSelectedMedia(selectedMedia?.name === file.name ? null : file)}
              className={`rounded-xl overflow-hidden border-2 transition-all text-left ${
                selectedMedia?.name === file.name ? 'border-[#ca3433] shadow-lg' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div className="bg-gray-100 aspect-square flex items-center justify-center overflow-hidden">
                {file.type === 'image' ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-contain p-2" />
                ) : (
                  <Film className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <div className="p-2 bg-white">
                <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selectedMedia && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex gap-6">
          <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.url} alt={selectedMedia.name} className="w-full h-full object-contain p-2" />
            ) : (
              <Film className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <p className="font-bold text-[#0e1f3e] text-lg">{selectedMedia.name}</p>
            <table className="text-sm">
              <tbody>
                <tr><td className="text-gray-500 pr-4 py-0.5">Type</td><td className="font-medium capitalize">{selectedMedia.type} ({selectedMedia.ext})</td></tr>
                <tr><td className="text-gray-500 pr-4 py-0.5">Size</td><td className="font-medium">{formatBytes(selectedMedia.size)}</td></tr>
                <tr><td className="text-gray-500 pr-4 py-0.5">URL</td><td><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{selectedMedia.url}</code></td></tr>
              </tbody>
            </table>
            <a
              href={selectedMedia.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[#ca3433] hover:underline text-sm font-medium"
            >
              Open in new tab ↗
            </a>
          </div>
        </div>
      )}
    </div>
  )

  const views: Record<Tab, React.ReactNode> = {
    analytics: analyticsView,
    content: contentView,
    media: mediaView,
  }

  const tabTitles: Record<Tab, string> = {
    analytics: 'Analytics',
    content: 'Content',
    media: 'Media',
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarNav}

      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold text-[#0e1f3e]">{tabTitles[activeTab]}</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ca3433] rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {views[activeTab]}
        </div>
      </main>
    </div>
  )
}

/* ──────────────── SHARED UI ──────────────── */
function NavBtn({
  icon,
  label,
  active,
  onClick,
  small,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${small ? 'text-sm' : 'text-sm font-medium'} ${
        active
          ? 'bg-white/20 text-white border-r-4 border-[#ca3433]'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-[#0e1f3e] mb-4 pb-2 border-b border-gray-100">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ca3433] focus:border-transparent outline-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ca3433] focus:border-transparent outline-none"
        />
      )}
    </div>
  )
}
